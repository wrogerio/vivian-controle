import db from "../database/db";
import { categoria } from "./../interfaces/index";

export const GetAll = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categorias Order By Nome", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const GetById = (id: number) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM categorias WHERE Id = ?", [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const Add = (categoria: categoria) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO categorias SET ?", [categoria], (err, result) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};

export const Update = (categoria: categoria) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE categorias SET ? WHERE Id = ?", [categoria, categoria.id], (err, result) => {
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
        db.query("DELETE FROM categorias WHERE Id = ?", [id], (err, result) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};
