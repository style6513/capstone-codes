DROP DATABASE code;
CREATE DATABASE code;
\connect code

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY UNIQUE,
    email TEXT NOT NULL CHECK (position('@' IN email) > 1) UNIQUE,
    password TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE codes (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL DEFAULT 0,
    image TEXT NOT NULL
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE
); 

