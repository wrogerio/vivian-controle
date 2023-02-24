import pool from "@/database/dbSQL";
import db from "../database/db";
import { categoria } from "./../interfaces/index";

export const GetAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query("SELECT * FROM categorias Order By Nome");
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};

export const GetById = (id: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query("SELECT * FROM categorias WHERE Id = " + id);
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};

export const Add = (categoria: categoria) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query("INSERT INTO categorias (Nome) VALUES ('" + categoria.Nome + "')");
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};

export const Update = (categoria: categoria) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query("UPDATE categorias SET Nome = '" + categoria.Nome + "' WHERE Id = " + categoria.Id);
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};

export const Delete = (id: number) => {
    return new Promise(async (resolve, reject) => {
        try {
            await pool.connect();
            const result = await pool.request().query("DELETE FROM categorias WHERE Id = " + id);
            resolve(result.recordset);
        } catch (err) {
            reject(err);
        }
    });
};
