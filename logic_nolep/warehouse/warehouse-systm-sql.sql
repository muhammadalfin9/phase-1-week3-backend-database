CREATE TABLE produk (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL
);
CREATE TABLE inventoris (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES produk(product_id),
    quantity INT NOT NULL,
    locations VARCHAR(100) NOT NULL
);
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(100) NOT NULL,
    order_date VARCHAR(100) NOT NULL
);
CREATE TABLE order_details (
    order_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES produk(product_id) 
);

INSERT INTO produk (`product_id`, `product_name`, `category`, `price`) VALUES (1, "Laptop", "elektronik", 999.99),
(2, "meja kursi", "perabot", 199.99), (3, "printer", "elektronik", 299.99), (4, "rak buku", "perabot", 149.99);

SELECT product_name, price 
FROM produk 
ORDER BY price DESC;


INSERT INTO inventoris (`inventory_id`, `product_id`, `quantity`, `locations`) VALUES
 (1, 1, 50, 'Gudang A'), (2, 2, 30, 'Gudang B'), (3, 3, 20, 'Gudang A'), (4, 4, 40, 'Gudang B');

 SELECT 
    p.product_name, 
    i.quantity, 
    i.locations
FROM produk p
JOIN inventoris i ON p.product_id = i.product_id;

UPDATE produk
SET price = 1099.99
WHERE product_name = "Laptop";

SELECT 
    i.locations, 
    SUM(p.price * i.quantity) AS total_value
FROM inventoris i
JOIN produk p ON i.product_id = p.product_id
GROUP BY i.locations;

INSERT INTO orders (`order_id`, `customer_id`, `order_date`) 
VALUES (1, 101, '2024-08-12'), (2, 102, '2024-08-13');

INSERT INTO order_details (`order_detail_id`, `order_id`, `product_id`, `quantity`) 
VALUES (1, 1, 1, 2), (2, 1, 3, 1), (3, 2, 2, 1), (4, 2, 4, 2);

SELECT 
    o.order_id, 
    o.order_date, 
    SUM(od.quantity * p.price) AS total_amount
FROM orders o
JOIN order_details od ON o.order_id = od.order_id
JOIN produk p ON od.product_id = p.product_id
GROUP BY o.order_id, o.order_date;

SELECT p.product_name, p.category
FROM produk p
LEFT JOIN order_details od ON p.product_id = od.product_id
WHERE od.order_id IS NULL;

SELECT 
    p.product_name, 
    i.quantity, 
    i.locations
FROM produk p
JOIN inventoris i ON p.product_id = i.product_id;
