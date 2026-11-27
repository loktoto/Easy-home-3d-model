-- Test-mode payment ledger. Never grant authenticated users write access.
create table public.easy3d_entitlements(
 source_id text primary key, owner uuid not null references auth.users(id) on delete cascade,
 plan text not null check(plan in ('home_plus','professional')), active boolean not null,
 expires_at timestamptz, event_created bigint not null, updated_at timestamptz not null default now()
);
create table public.easy3d_billing_events(id text primary key,received_at timestamptz not null default now());
alter table public.easy3d_entitlements enable row level security;
alter table public.easy3d_billing_events enable row level security;
revoke all on public.easy3d_entitlements,public.easy3d_billing_events from anon,authenticated;
grant select on public.easy3d_entitlements to authenticated;
create policy easy3d_own_entitlements on public.easy3d_entitlements for select to authenticated using ((select auth.uid())=owner);
create function public.easy3d_record_billing(p_event text,p_source text,p_owner uuid,p_plan text,p_active boolean,p_expires timestamptz,p_created bigint)
returns boolean language plpgsql security definer set search_path='' as $$
begin
 insert into public.easy3d_billing_events(id) values(p_event) on conflict do nothing;
 if not found then return false;end if;
 insert into public.easy3d_entitlements(source_id,owner,plan,active,expires_at,event_created)
 values(p_source,p_owner,p_plan,p_active,p_expires,p_created)
 on conflict(source_id) do update set active=excluded.active,expires_at=excluded.expires_at,event_created=excluded.event_created,updated_at=now()
 where easy3d_entitlements.owner=excluded.owner and easy3d_entitlements.plan=excluded.plan and easy3d_entitlements.event_created<=excluded.event_created;
 return true;
end $$;
revoke all on function public.easy3d_record_billing(text,text,uuid,text,boolean,timestamptz,bigint) from public,anon,authenticated;
grant execute on function public.easy3d_record_billing(text,text,uuid,text,boolean,timestamptz,bigint) to service_role;
-- Hosted paid enforcement is explicitly off in source/test environment. Do not enable using test-mode data.
create schema if not exists easy3d_private;
revoke all on schema easy3d_private from public,anon,authenticated;
create table easy3d_private.billing_settings(singleton boolean primary key default true check(singleton),enabled boolean not null default false);
insert into easy3d_private.billing_settings(singleton,enabled) values(true,false);
create function public.easy3d_paid_write_allowed(p_owner uuid) returns boolean language sql stable security definer set search_path='' as $$
 select not (select enabled from easy3d_private.billing_settings where singleton) or exists(
 select 1 from public.easy3d_entitlements e where e.owner=p_owner and e.plan='professional' and e.active and (e.expires_at is null or e.expires_at>now()))
$$;
revoke all on function public.easy3d_paid_write_allowed(uuid) from public,anon;
grant execute on function public.easy3d_paid_write_allowed(uuid) to authenticated;
-- Restrictive policy combines with owner/editor permissive RLS. Reads and deletes remain available.
create policy easy3d_paid_insert on public.easy3d_projects as restrictive for insert to authenticated with check(public.easy3d_paid_write_allowed(owner));
create policy easy3d_paid_update on public.easy3d_projects as restrictive for update to authenticated using(public.easy3d_paid_write_allowed(owner)) with check(public.easy3d_paid_write_allowed(owner));
