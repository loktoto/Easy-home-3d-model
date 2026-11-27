-- Easy3DHome cloud workspace. Apply only to its dedicated Supabase project.
create table public.easy3d_projects(
 owner uuid not null default auth.uid() references auth.users(id) on delete cascade,
 id text not null check(length(id) between 1 and 100),
 name text not null check(length(name)<=80),
 doc jsonb not null check(jsonb_typeof(doc)='object' and doc->>'schema'='easy-home-3d' and doc->>'version'='1' and octet_length(doc::text)<=3000000),
 revision integer not null default 1 check(revision>0),
 updated_at timestamptz not null default now(),
 primary key(owner,id)
);
alter table public.easy3d_projects enable row level security;
revoke all on public.easy3d_projects from anon, authenticated;
grant select,insert,update,delete on public.easy3d_projects to authenticated;
create policy easy3d_owner_read on public.easy3d_projects for select to authenticated using ((select auth.uid())=owner);
create policy easy3d_owner_insert on public.easy3d_projects for insert to authenticated with check ((select auth.uid())=owner and revision=1);
create policy easy3d_owner_update on public.easy3d_projects for update to authenticated using ((select auth.uid())=owner) with check ((select auth.uid())=owner);
create policy easy3d_owner_delete on public.easy3d_projects for delete to authenticated using ((select auth.uid())=owner);
create function public.easy3d_revision_guard() returns trigger language plpgsql security invoker set search_path='' as $$
begin
 if new.owner<>old.owner or new.id<>old.id or new.revision<>old.revision+1 then raise exception 'Invalid revision or identity' using errcode='22023';end if;
 new.updated_at=now();return new;
end $$;
revoke execute on function public.easy3d_revision_guard() from public;
create trigger easy3d_project_revision before update on public.easy3d_projects for each row execute function public.easy3d_revision_guard();
