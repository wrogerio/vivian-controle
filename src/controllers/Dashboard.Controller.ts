import pool from "@/database/dbSQL";

export const GetGastoDiario = async (ano: number, mes: number) => {
    var querie = `  SET LANGUAGE Portuguese;
                    SELECT Ano, Mes, Dia, DiaNome, Total 
                    FROM vGastoDiario
                    WHERE Ano = ${ano} AND Mes = ${mes}
                    ORDER BY Dia Desc`;
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

export const GetGastoPorDia = async (ano: number, mes: number, dia: number) => {
    var querie = `  SELECT Cast(DtLancamento As Date) As DtLancamento, Ano, Mes, Dia, Categoria, Descricao, Valor
                    FROM vLancamentos
                    WHERE Ano = ${ano} and Mes = ${mes} And Dia = ${dia}
                    ORDER BY DtLancamento Desc`;
    console.log(querie);
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

export const GetTotal = async (ano: number, mes: number) => {
    var querie = `  SELECT t.Nome As Tipo, Sum(l.Valor) as Total
                    FROM Lancamentos l
                    INNER JOIN Tipos t on l.TipoId = t.Id
                    WHERE YEAR(l.DtLancamento) = ${ano} AND MONTH(l.DtLancamento) = ${mes}
                    GROUP BY t.Nome
                    ORDER BY t.Nome Desc`;
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
