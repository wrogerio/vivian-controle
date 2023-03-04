import pool from "@/database/dbSQL";
import { lancamento } from "./../interfaces/index";

export const GetAll = () => {
    var querie = `  SELECT TOP 200 l.Id, l.DtLancamento, l.DtLancamentoString, l.Descricao, l.Valor, l.CategoriaId, l.Categoria, l.TipoId, l.Tipo 
                    FROM vLancamentos l
                    ORDER BY l.DtLancamento DESC, l.Categoria`;
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

export const GetById = (id: string) => {
    var querie = `  SELECT l.Id, l.DtLancamento, l.DtLancamentoString, l.Descricao, l.Valor, l.CategoriaId, l.Categoria , l.TipoId, l.Tipo 
                    FROM vLancamentos l
                    WHERE l.Id = '${id}'`;
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query(querie, [id]);
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};

export const Add = (lancamento: lancamento) => {
    var querie = `INSERT INTO lancamentos (DtLancamento, Descricao, Valor, CategoriaId, TipoId) VALUES ('${lancamento.DtLancamento}', '${lancamento.Descricao}', '${lancamento.Valor}', '${lancamento.CategoriaId}', '${lancamento.TipoId}')`;
    return new Promise(async (resolve, reject) => {
        try {
            pool.connect();
            await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};

export const Update = (lancamento: lancamento) => {
    var querie = `UPDATE lancamentos SET DtLancamento = '${lancamento.DtLancamento}', Descricao = '${lancamento.Descricao}', Valor = '${lancamento.Valor}', CategoriaId = '${lancamento.CategoriaId}', TipoId = '${lancamento.TipoId}' WHERE Id = '${lancamento.Id}'`;
    return new Promise(async (resolve, reject) => {
        try {
            pool.connect();
            await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};

export const Delete = (id: string) => {
    var querie = `DELETE FROM lancamentos WHERE Id = '${id}'`;
    return new Promise(async (resolve, reject) => {
        try {
            pool.connect();
            await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};
