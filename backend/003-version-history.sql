-- Server-side immutable revision snapshots. History is owner-only, not exposed to shared viewers/editors.
create table public.easy3d_versions(
 owner uuid not null,project_id text not null,revision integer not null check(revision>0),
 doc jsonb not null,name text not null,created_at timestamptz not null default now(),actor uuid references auth.users(id) on delete set null,
 primary key(owner,project_id,revision),
 foreign key(owner,project_id) references public.easy3d_projects(owner,id) on delete cascade
);
alter table public.easy3d_versions enable row level security;
revoke all on public.easy3d_versions from anon,authenticated;
grant select on public.easy3d_versions to authenticated;
create policy easy3d_versions_owner_read on public.easy3d_versions for select to authenticated using ((select auth.uid())=owner);
create function public.easy3d_snapshot_revision() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.easy3d_versions(owner,project_id,revision,doc,name,actor)
 values(new.owner,new.id,new.revision,new.doc,new.name,auth.uid());
 -- Retention: latest 50 snapshots. Clients cannot modify snapshots.
 delete from public.easy3d_versions where owner=new.owner and project_id=new.id and revision<=new.revision-50;
 return new;
end $$;
revoke all on function public.easy3d_snapshot_revision() from public,anon,authenticated;
create trigger easy3d_snapshot after insert or update on public.easy3d_projects for each row execute function public.easy3d_snapshot_revision();
insert into public.easy3d_versions(owner,project_id,revision,doc,name) select owner,id,revision,doc,name from public.easy3d_projects on conflict do nothing;
