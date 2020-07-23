create table todos
(
    id          bigint primary key auto_increment,
    description varchar(90) not null,
    is_done     bit         not null,
    deadline    date
);