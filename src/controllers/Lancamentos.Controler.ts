import pool from "@/database/dbSQL";
import { lancamento, toggleStatusDto } from "./../interfaces/index";

export const GetAll = () => {
    var querie = `  SELECT TOP 200 l.Id, l.DtLancamento, l.DtLancamentoString, l.Descricao, l.Valor, l.CategoriaId, l.Categoria, l.TipoId, l.Tipo, l.StatusId, l.Status
                    FROM vLancamentos l
                    WHERE l.DtLancamento >= dbo.f_LimitMonth()
                    ORDER BY l.Status, l.DtLancamento DESC, l.Categoria`;
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
    var querie = `  SELECT l.Id, l.DtLancamento, l.DtLancamentoString, l.Descricao, l.Valor, l.CategoriaId, l.Categoria , l.TipoId, l.Tipo, l.StatusId, l.Status
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
    var querie = `INSERT INTO lancamentos (DtLancamento, Descricao, Valor, CategoriaId, TipoId, StatusId) VALUES ('${lancamento.DtLancamento}', '${lancamento.Descricao}', '${lancamento.Valor}', '${lancamento.CategoriaId}', '${lancamento.TipoId}', '${lancamento.StatusId}')`;
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
    var querie = `UPDATE lancamentos SET DtLancamento = '${lancamento.DtLancamento}', Descricao = '${lancamento.Descricao}', Valor = '${lancamento.Valor}', StatusId = '${lancamento.StatusId}',  CategoriaId = '${lancamento.CategoriaId}', TipoId = '${lancamento.TipoId}' WHERE Id = '${lancamento.Id}'`;
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

export const ToogleStatus = (toggle: toggleStatusDto) => {
    const newStatus = toggle.StatusId.toLowerCase() == "26420821-c9b7-4d89-83aa-3edaf09cf8cf" ? "f927e827-6d2d-47d5-ae57-34e85fd8fcb1" : "26420821-c9b7-4d89-83aa-3edaf09cf8cf";
    var querie = `UPDATE lancamentos SET StatusId = '${newStatus}' WHERE Id = '${toggle.Id.toLowerCase()}'`;

    console.log(querie);
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
