import pool from "@/database/dbSQL";
import { categoria } from "./../interfaces/index";

export const GetAll = () => {
    const querie = "SELECT * FROM categorias Order By Nome";
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
    const querie = `SELECT * FROM categorias WHERE Id = '${id}'`;
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

export const Add = (categoria: categoria) => {
    const querie = `INSERT INTO categorias (Nome) VALUES ('${categoria.Nome}')`;
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};

export const Update = (categoria: categoria) => {
    const querie = `UPDATE categorias SET Nome = '${categoria.Nome}' WHERE Id = '${categoria.Id}'`;
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};

export const Delete = (id: string) => {
    const querie = `DELETE FROM categorias WHERE Id = '${id}'`;
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query(querie);
            resolve(true);
        } catch (err) {
            reject(false);
        }
    });
};
