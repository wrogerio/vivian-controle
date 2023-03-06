import pool from "@/database/dbSQL";

export const GetAll = () => {
    const querie = "SELECT * FROM TbStatus Order By Nome";
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query(querie);
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};
