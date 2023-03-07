const sql = require("mssql");
const config = {
    user: "w_controlecasa_usr",
    password: "Brasil82+82",
    server: "mssql-112705-0.cloudclusters.net",
    port: 19809,
    database: "w_ControleCasa",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const pool = new sql.ConnectionPool(config);

export default pool;
