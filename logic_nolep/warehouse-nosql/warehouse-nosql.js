// # # Logic Nolep (Warehouse Management System No-SQL)
// Kali ini kalian akan diberi tugas untuk membuat Warehouse Database System. dan kalian harus mengikuti langhak2 dan syarat2 tertentu untuk
// mengerjakan soal ini.

// 1. buat database warehouse dan buat colection untuk warehouse system
//   -  Products
//   -  Inventory
//   -  Orders

db.createCollection("Products");
db.createCollection("Inventory");
db.createCollection("Orders");

// 2. Masukkan data berikut ke dalam Colections Products dengan isi data `(_id, product_name, category, price)` :
//     - (1, 'Laptop', 'Elektronik', 999,99)
//     - (2, 'Meja Kursi', 'Perabot', 199,99)
//     - (3, 'Printer', 'Elektronik', 299,99)
//     - (4, 'Rak Buku', 'Perabot', 149,99)

db.Products.insertMany([
  {
    _id: 1,
    product_name: "laptop",
    category: "elektronik",
    price: Decimal128("999.99"),
  },
  {
    _id: 2,
    product_name: "meja kursi",
    category: "perabot",
    price: Decimal128("199.99"),
  },
  {
    _id: 3,
    product_name: "printer",
    category: "elektronik",
    price: Decimal128("299.99"),
  },
  {
    _id: 4,
    product_name: "rak buku",
    category: "perabot",
    price: Decimal128("149.99"),
  },
]);

// 3. Tulis query untuk menampilkan semua produk beserta nama dan harganya, diurutkan berdasarkan harga dalam urutan menaik (Asceding).

db.Products.find({}, { product_name: 1, price: 1, _id: 0 }).sort({ price: 1 });

// Expected output:
// ```json
// [
//   { "product_name": "Bookshelf", "price": 149.99 },
//   { "product_name": "Desk Chair", "price": 199.99 },
//   { "product_name": "Printer", "price": 299.99 },
//   { "product_name": "Laptop", "price": 999.99 }
// ]
// ```

// 4. Masukkan data berikut ke dalam Colection Inventory dengan isi data `(_id, product_id, quantity, location)` :
//     - (1, 1, 50, 'Gudang A')
//     - (2, 2, 30, 'Gudang B')
//     - (3, 3, 20, 'Gudang A')
//     - (4, 4, 40, 'Gudang B')

db.Inventory.insertMany([
  { _id: 1, product_id: 1, quantity: 50, location: "gudang a" },
  { _id: 2, product_id: 2, quantity: 30, location: "gudang b" },
  { _id: 3, product_id: 3, quantity: 20, location: "gudang a" },
  { _id: 4, product_id: 4, quantity: 40, location: "gudang b" },
]);

// 5. Tulis Query untuk menggabungkan tabel (aggregate) Produk dan Inventaris, yang menampilkan nama produk, kuantitas, dan lokasi untuk semua produk.

db.Products.aggregate([
  {
    $lookup: {
      from: "Inventory",
      localField: "_id",
      foreignField: "product_id",
      as: "stok_data",
    },
  },
  {
    $unwind: "$stok_data",
  },
  {
    $project: {
      _id: 0,
      product_name: 1,
      quantity: "$stok_data.quantity",
      location: "$stok_data.location",
    },
  },
]);

// Expected output:
// ```json
// [
//   { "product_name": "Laptop", "quantity": 50, "location": "Warehouse A" },
//   { "product_name": "Desk Chair", "quantity": 30, "location": "Warehouse B" },
//   { "product_name": "Printer", "quantity": 20, "location": "Warehouse A" },
//   { "product_name": "Bookshelf", "quantity": 40, "location": "Warehouse B" }
// ]
// ```

// 6. Perbarui harga 'Laptop' menjadi 1099,99.
db.Products.updateOne(
  { product_name: "laptop" },
  { $set: { price: Decimal128("1099.99") } },
);

// 7. Tuliskan query untuk menghitung nilai total inventaris pada setiap gudang.
db.Inventory.aggregate([
  {
    $lookup: {
      from: "Products",
      localField: "product_id",
      foreignField: "_id",
      as: "info_produk",
    },
  },
  {
    $unwind: "$info_produk",
  },
  {
    $group: {
      _id: "$location",
      total_nilai_stok: {
        $sum: { $multiply: ["$quantity", "$info_produk.price"] },
      },
      jumlah_barang: { $sum: "$quantity" },
    },
  },
]);

// Output yang diharapkan (setelah pembaruan harga pada pertanyaan 6):
// ```json
// [
//   { "_id": "Warehouse A", "total_value": 60999.80 },
//   { "_id": "Warehouse B", "total_value": 11999.60 }
// ]
// ```

// 8. Masukkan data berikut ke dalam Colection Orders :

db.Orders.insertMany([
  {
    _id: 1,
    customer_id: 101,
    order_date: ISODate("2024-08-12"),
    order_details: [
      { product_id: 1, quantity: 2 },
      { product_id: 3, quantity: 1 },
    ],
  },
  {
    _id: 2,
    customer_id: 102,
    order_date: ISODate("2024-08-13"),
    order_details: [
      { product_id: 2, quantity: 1 },
      { product_id: 4, quantity: 2 },
    ],
  },
]);

// ```json
//   {
//     _id: 1,
//     customer_id: 101,
//     order_date: ISODate("2024-08-12"),
//     order_details: [
//       { product_id: 1, quantity: 2 },
//       { product_id: 3, quantity: 1 }
//     ]
//   },
//   {
//     _id: 2,
//     customer_id: 102,
//     order_date: ISODate("2024-08-13"),
//     order_details: [
//       { product_id: 2, quantity: 1 },
//       { product_id: 4, quantity: 2 }
//     ]
//   }
// ```

// 9. Tulis Query untuk menampilkan jumlah total untuk setiap pesanan, termasuk order_id, order_date, dan total_amount.

db.Orders.aggregate([
  {
    $unwind: "$order_details",
  },
  {
    $lookup: {
      from: "Products",
      localField: "order_details.product_id",
      foreignField: "_id",
      as: "produk_item",
    },
  },
  {
    $unwind: "$produk_item",
  },
  {
    $group: {
      _id: "$_id",
      order_date: { $first: "$order_date" },
      total_amount: {
        $sum: { $multiply: ["$order_details.quantity", "$produk_item.price"] },
      },
    },
  },
  {
    $project: {
      _id: 0,
      order_id: "$_id",
      order_date: 1,
      total_amount: 1,
    },
  },
]);

// Expected output:
// ```json
// [
//   { "order_id": 1, "order_date": ISODate("2024-08-12T00:00:00Z"), "total_amount": 2499.97 },
//   { "order_id": 2, "order_date": ISODate("2024-08-13T00:00:00Z"), "total_amount": 499.97 }
// ]
// ```

// 10. Tulis query untuk mencari produk yang belum pernah dipesan.
db.Products.aggregate([
  {
    $lookup: {
      from: "Orders",
      localField: "_id",
      foreignField: "order_details.product_id",
      as: "data_pesanan",
    },
  },
  {
    $match: {
      data_pesanan: { $size: 0 },
    },
  },
  {
    $project: {
      _id: 1,
      product_name: 1,
      category: 1,
    },
  },
]);
