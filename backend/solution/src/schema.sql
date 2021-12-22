create table if not exists users
(
    id    char(36)     not null
        constraint pk_users
            primary key,
    email varchar(128) not null
        constraint uq_email
            unique
);

alter table users owner to postgres;

create table if not exists events
(
    id         char(36)                 not null
        primary key,
    user_id    char(36)                 not null
        constraint events_users
            references users,
    consent_id varchar(64)              not null,
    created_at timestamp with time zone not null,
    enabled    boolean                  not null,
    constraint "uq_userId_consentId_createdAt"
        unique (user_id, consent_id, created_at)
);

alter table events owner to postgres;
