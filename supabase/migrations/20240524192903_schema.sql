create table users (
  id uuid references auth.users not null primary key,
  photo_url text,
  display_name text,
  created_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, display_name, photo_url)
  values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data
  ->> 'photo_url');
  return new;
end;
$$;
 
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();