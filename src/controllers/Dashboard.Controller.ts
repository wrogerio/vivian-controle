import db from "../database/db";

export const GetTotal = async (ano: number, mes: number) => {
    var querie = `  select Sum(valor) as total
                    from lancamentos
                    where year(dtLancamento) = ${ano} and month(dtLancamento) = ${mes}`;
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
