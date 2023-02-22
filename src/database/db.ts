import mysql from "mysql";

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// show message if db is connected
try {
    db.connect();
    console.log("Connected to database");
} catch (err) {
    console.log("Error connecting to database");
}

export default db;
