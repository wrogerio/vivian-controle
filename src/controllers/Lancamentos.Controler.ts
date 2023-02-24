import db from "../database/db";
import pool from "@/database/dbSQL";
import { lancamento } from "./../interfaces/index";

export const GetAll = () => {
    var querie = `  select top 200 l.id, l.dtLancamento, DATE_FORMAT(dtLancamento, '%Y-%m-%d') as dtLancamentostring, l.descricao, l.valor, l.categoriaId, c.nome as categoria
                    from lancamentos l
                    inner join categorias c on l.CategoriaId = c.id
                    order by dtLancamento desc, c.nome`;
    try {
        pool.connect();
        const result = pool.request().query("SELECT * FROM lancamentos Order By Nome");
        return result.recordset;
    } catch (err) {
        return err;
    }

    return new Promise((resolve, reject) => {
        db.query(querie, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const GetById = (id: number) => {
    var querie = `  select l.id, l.dtLancamento, DATE_FORMAT(dtLancamento, '%Y-%m-%d') as dtLancamentostring, l.descricao, l.valor, l.categoriaId, c.nome as categoria
                    from lancamentos l
                    inner join categorias c on l.CategoriaId = c.id
                    where l.id = ?`;

    return new Promise((resolve, reject) => {
        db.query(querie, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const Add = (lancamento: lancamento) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO lancamentos SET ?", lancamento, (err, result) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const Update = (lancamento: lancamento) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE lancamentos SET ? WHERE Id = ?", [lancamento, lancamento.id], (err, result) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const Delete = (id: number) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM lancamentos WHERE Id = ?", [id], (err, result) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};
