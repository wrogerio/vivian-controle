const sql = require("mssql");
const config = {
    user: "viviancontroleusr",
    password: "Brasil82+82",
    server: "mssql-112705-0.cloudclusters.net",
    port: 19809,
    database: "VivianControleDb",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const pool = new sql.ConnectionPool(config);

export default pool;
