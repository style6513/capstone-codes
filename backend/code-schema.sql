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
    created_by VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL DEFAULT 0,
    image TEXT DEFAULT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL
)

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    code_id INT REFERENCES codes(id) ON DELETE CASCADE,
    liked_by VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE
); 

