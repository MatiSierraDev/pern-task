CREATE DATABASE taskdb;

CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  state boolean default 'true'
);