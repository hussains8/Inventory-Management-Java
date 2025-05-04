CREATE TABLE Products (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2)
);
INSERT INTO Products (name, quantity, price) VALUES ('Laptop', 50, 1200.99);
INSERT INTO Products (name, quantity, price) VALUES ('Mouse', 200, 19.99);
