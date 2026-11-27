-- Authenticated sharing, revocable memberships, one-use invitations.
create extension if not exists pgcrypto with schema extensions;
create table public.easy3d_members(
 owner uuid not null, project_id text not null, member uuid not null references auth.users(id) on delete cascade,
 role text not null check(role in ('viewer','editor')), expires_at timestamptz not null,
 primary key(owner,project_id,member),
 foreign key(owner,project_id) references public.easy3d_projects(owner,id) on delete cascade,
 check(owner<>member)
);
create table public.easy3d_invites(
 owner uuid not null,project_id text not null, token_hash text primary key check(token_hash ~ '^[a-f0-9]{64}$'),
 role text not null check(role in ('viewer','editor')),expires_at timestamptz not null,
 claimed_by uuid references auth.users(id) on delete set null,claimed_at timestamptz,
 foreign key(owner,project_id) references public.easy3d_projects(owner,id) on delete cascade
);
alter table public.easy3d_members enable row level security;
alter table public.easy3d_invites enable row level security;
revoke all on public.easy3d_members,public.easy3d_invites from anon,authenticated;
grant select,delete on public.easy3d_members to authenticated;
grant select,insert,delete on public.easy3d_invites to authenticated;
create policy easy3d_members_read on public.easy3d_members for select to authenticated using ((select auth.uid()) in(owner,member));
create policy easy3d_members_revoke on public.easy3d_members for delete to authenticated using ((select auth.uid())=owner);
create policy easy3d_invites_read on public.easy3d_invites for select to authenticated using ((select auth.uid())=owner);
create policy easy3d_invites_create on public.easy3d_invites for insert to authenticated with check ((select auth.uid())=owner and claimed_at is null and claimed_by is null and expires_at>now() and expires_at<=now()+interval '31 days');
create policy easy3d_invites_delete on public.easy3d_invites for delete to authenticated using ((select auth.uid())=owner);
create policy easy3d_shared_read on public.easy3d_projects for select to authenticated using (
 exists(select 1 from public.easy3d_members m where m.owner=easy3d_projects.owner and m.project_id=easy3d_projects.id and m.member=(select auth.uid()) and m.expires_at>now()));
create policy easy3d_shared_edit on public.easy3d_projects for update to authenticated using (
 exists(select 1 from public.easy3d_members m where m.owner=easy3d_projects.owner and m.project_id=easy3d_projects.id and m.member=(select auth.uid()) and m.role='editor' and m.expires_at>now()))
 with check(exists(select 1 from public.easy3d_members m where m.owner=easy3d_projects.owner and m.project_id=easy3d_projects.id and m.member=(select auth.uid()) and m.role='editor' and m.expires_at>now()));
create function public.easy3d_claim_invite(p_token text) returns jsonb language plpgsql security definer set search_path='' as $$
declare inv public.easy3d_invites%rowtype; uid uuid:=auth.uid();
begin
 if uid is null or p_token !~ '^[a-f0-9]{64}$' then raise exception 'Invalid invitation' using errcode='22023';end if;
 select * into inv from public.easy3d_invites where token_hash=encode(extensions.digest(p_token,'sha256'),'hex') for update;
 if not found or inv.claimed_at is not null or inv.expires_at<=now() or inv.owner=uid then raise exception 'Invalid or expired invitation' using errcode='22023';end if;
 insert into public.easy3d_members(owner,project_id,member,role,expires_at) values(inv.owner,inv.project_id,uid,inv.role,inv.expires_at)
 on conflict(owner,project_id,member) do update set role=excluded.role,expires_at=excluded.expires_at;
 update public.easy3d_invites set claimed_by=uid,claimed_at=now() where token_hash=inv.token_hash;
 return jsonb_build_object('owner',inv.owner,'id',inv.project_id,'role',inv.role);
end $$;
revoke all on function public.easy3d_claim_invite(text) from public,anon;
grant execute on function public.easy3d_claim_invite(text) to authenticated;
