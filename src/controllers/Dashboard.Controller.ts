import pool from "@/database/dbSQL";

export const GetTotal = async (ano: number, mes: number) => {
    var querie = `  SELECT Sum(l.Valor) as Total
                    FROM Lancamentos l
                    WHERE YEAR(l.DtLancamento) = ${ano} AND MONTH(l.DtLancamento) = ${mes}`;
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

export const GetItems = async (ano: number, mes: number) => {
    var querie = `  SELECT c.Nome AS Categoria, SUM(l.Valor) AS Total
                    FROM Lancamentos l
                    INNER JOIN Categorias c ON l.CategoriaId = c.Id
                    WHERE YEAR(l.DtLancamento) = ${ano} AND MONTH(l.DtLancamento) = ${mes}
                    GROUP BY c.Nome
                    ORDER BY 2 DESC`;
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
