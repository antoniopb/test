
CREATE TABLE restaurant(
    id serial INTEGER PRIMARY KEY,
    name VARCHAR,
    address_id INTEGER,
    FOREIGN KEY (address_id) REFERENCES Address(id) 
);

CREATE TABLE address(
    id serial INTEGER PRIMARY KEY,
    street VARCHAR,
    num INTEGER,
    neighborhood VARCHAR,
    city VARCHAR,
    state VARCHAR,
    country VARCHAR
);
