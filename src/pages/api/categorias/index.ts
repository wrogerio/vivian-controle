import { NextApiRequest, NextApiResponse } from "next";
import { GetAll, Add } from "../../../controllers/Categoria.Conrtoller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            GetAll()
                .then((dados) => {
                    res.status(200).json(dados);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
            break;
        case "POST":
            const resultPost = (await Add(req.body)) as boolean;
            res.status(201).send(resultPost);
            break;
        default:
            res.status(405).send("Método não permitido");
            break;
    }
};
