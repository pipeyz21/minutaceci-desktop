-- Your SQL goes here
CREATE TABLE clients (
    id SERIAL PRIMARY KEY ,
    name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    address VARCHAR
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY ,
    sale_id INTEGER NOT NULL,
    product INTEGER NOT NULL,
    garnish INTEGER,
    extra INTEGER,
    price INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    order_type TEXT NOT NULL
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY ,
    date DATE NOT NULL,
    client_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    payment TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT
);