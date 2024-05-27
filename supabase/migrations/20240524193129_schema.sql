create table challenges (
    challenge_id bigint generated always as identity primary key,
    challenge_name text not null,
    challenge_description text,
    challenge_start_date timestamptz not null,
    challenge_end_date timestamptz not null,
    password text not null,
    created_by uuid not null references public.users on delete cascade,
    created_at timestamptz not null default now()
);

-- Missing Row Level Security

-- User Challenges Table
create table user_challenges (
    challenge_id bigint not null references public.challenges on delete cascade,
    user_id uuid not null references public.users on delete cascade,
    user_name text not null,
    progress int not null default 0,
    last_updated_at timestamptz not null default now(),
    streak int not null default 0,
    primary key (challenge_id, user_id)
);

-- Missing Row Level Security