CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstname varchar(80) NOT NULL,
lastName varchar(80) NOT NULL,
userName varchar(80) NOT NULL UNIQUE,
password varchar(160) NOT NULL
);

CREATE TABLE PPR_2016 (
id SERIAL PRIMARY KEY,
displayName varchar(80) NOT NULL,
team varchar(4) NOT NULL,
pos varchar(4) NOT NULL,
byeweek int NOT NULL,
teams_8 int NOT NULL,
teams_10 int NOT NULL,
teams_12 int NOT NULL,
teams_14 int NOT NULL,
teams_16 int NOT NULL
);

CREATE TABLE Standard_2016 (
id SERIAL PRIMARY KEY,
displayName varchar(80) NOT NULL,
team varchar(4) NOT NULL,
pos varchar(4) NOT NULL,
byeweek int NOT NULL,
teams_8 int NOT NULL,
teams_10 int NOT NULL,
teams_12 int NOT NULL,
teams_14 int NOT NULL,
teams_16 int NOT NULL
);
