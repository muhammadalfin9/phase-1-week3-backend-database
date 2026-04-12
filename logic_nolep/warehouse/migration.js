import db from "./database_connection.js";
db.serialize(() => {
  db.run(`CREATE TABLE produk (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(15, 2) NOT NULL
)`);

  db.run(`CREATE TABLE inventoris (
    inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER NOT NULL,
    locations VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES produk(product_id)
)`);

  db.run(`CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id VARCHAR(100) NOT NULL,
    order_date VARCHAR(100) NOT NULL
)`);

  db.run(`CREATE TABLE order_details (
    order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES produk(product_id)
)`);

  db.run(`INSERT INTO produk (product_name, category, price) VALUES 
    ('Laptop', 'elektronik', 999.99),
    ('meja kursi', 'perabot', 199.99),
    ('printer', 'elektronik', 299.99),
    ('rak buku', 'perabot', 149.99)`);

  db.run(`INSERT INTO inventoris (product_id, quantity, locations) VALUES
    (1, 50, 'Gudang A'),
    (2, 30, 'Gudang B'),
    (3, 20, 'Gudang A'),
    (4, 40, 'Gudang B')`);

  db.run(`INSERT INTO orders (customer_id, order_date) VALUES 
    ('101', '2024-08-12'),
    ('102', '2024-08-13')`);

  db.run(`INSERT INTO order_details (order_id, product_id, quantity) VALUES 
    (1, 1, 2),
    (1, 3, 1),
    (2, 2, 1),
    (2, 4, 2)`);

  db.run(`UPDATE produk SET price = 1099.99 WHERE product_name = 'Laptop'`);
});
