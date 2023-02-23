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

export const GetItems = async (ano: number, mes: number) => {
    var querie = `  select c.nome as categoria, Sum(valor) as total
                    from lancamentos l
                    inner join categorias c on l.categoriaId = c.id
                    where year(dtLancamento) = ${ano} and month(dtLancamento) = ${mes}
                    group by c.nome
                    order by 2 desc`;
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
