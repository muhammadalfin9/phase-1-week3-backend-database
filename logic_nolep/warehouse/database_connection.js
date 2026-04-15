import sqlite3 from 'sqlite3'


const dbFile = './gudang.db';

const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
        console.error("Gagal terhubung ke database:", err.message);
    } else {
        console.log("Terhubung ke database SQLite.");
    }
});


export default db;



