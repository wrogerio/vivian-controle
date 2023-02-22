import { NextApiRequest, NextApiResponse } from "next";
import { getCategorias } from "../../../controllers/Categoria.Conrtoller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            const categ = await getCategorias();
            console.log(categ);
            res.status(200).json(categ);
            break;
        case "POST":
            console.log("POST");
            break;
        default:
            res.status(405).send("Método não permitido");
            break;
    }
};
