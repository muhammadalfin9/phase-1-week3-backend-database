# Logic Nolep (Warehouse Management System SQL)
Kali ini kalian akan diberi tugas untuk membuat Warehouse Database System. dan kalian harus mengikuti langhak2 dan syarat2 tertentu untuk 
mengerjakan soal ini.

1. buat database warehouse dan buat table dengan mengikuti syarat di bawah ini
`  -  Products (product_id, product_name, category, price)
  -  Inventory (inventory_id, product_id, quantity, location)
  -  Orders (order_id, customer_id, order_date)
  -  OrderDetails (order_detail_id, order_id, product_id, quantity)
`
2. Masukkan data berikut ke dalam tabel Products:
    - (1, 'Laptop', 'Elektronik', 999,99)
    - (2, 'Meja Kursi', 'Perabot', 199,99)
    - (3, 'Printer', 'Elektronik', 299,99)
    - (4, 'Rak Buku', 'Perabot', 149,99)
  
3. Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menurun.

Expected output:
```
product_name | price
-------------+--------
Laptop       | 999.99
Printer      | 299.99
Desk Chair   | 199.99
Bookshelf    | 149.99
```

4. Masukkan data berikut ke dalam tabel Inventaris:
    - (1, 1, 50, 'Gudang A')
    - (2, 2, 30, 'Gudang B')
    - (3, 3, 20, 'Gudang A')
    - (4, 4, 40, 'Gudang B')
  
5. Tulis Query untuk menggabungkan tabel Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk.

Expected output
```
product_name | quantity | location
-------------+----------+------------
Laptop       | 50       | Warehouse A
Desk Chair   | 30       | Warehouse B
Printer      | 20       | Warehouse A
Bookshelf    | 40       | Warehouse B
```

6. Perbarui harga 'Laptop' menjadi 1099,99.

7. Tuliskan kueri untuk menghitung nilai total inventaris pada setiap gudang.

Output yang diharapkan (setelah pembaruan harga pada pertanyaan 6):
```
location    | total_value
------------+------------
Warehouse A | 60999.80
Warehouse B | 11999.60
```

8. Masukkan data berikut ke dalam tabel Orders dan OrderDetails:
    1. Orders: (1, 101, '2024-08-12'), (2, 102, '2024-08-13')
    2. OrderDetails: (1, 1, 1, 2), (2, 1, 3, 1), (3, 2, 2, 1), (4, 2, 4, 2)
  
9. Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.

Expected Output:
```
order_id | order_date | total_amount
---------+------------+--------------
1        | 2024-08-12 | 2499.97
2        | 2024-08-13 | 499.97
```

10. Tulis kueri untuk mencari produk yang belum pernah dipesan.

Expected output:
```
product_id | product_name
-----------+--------------
(No rows, as all products have been ordered)
```

11. Buat tampilan yang menunjukkan tingkat stok saat ini untuk semua produk, termasuk nama_produk, jumlah, dan lokasi.

Expected output
```
product_name | quantity | location
-------------+----------+------------
Laptop       | 50       | Warehouse A
Desk Chair   | 30       | Warehouse B
Printer      | 20       | Warehouse A
Bookshelf    | 40       | Warehouse B
```
