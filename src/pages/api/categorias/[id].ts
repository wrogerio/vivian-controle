import { NextApiRequest, NextApiResponse } from "next";
import { Delete, GetById, Update } from "@/controllers/Categoria.Conrtoller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = parseInt(req.query?.id as string);

    switch (req.method) {
        case "GET":
            const resultGet = await GetById(id);
            res.status(200).json(resultGet);
            break;
        case "PUT":
            const resultPut = (await Update(req.body)) as boolean;
            res.status(200).json(resultPut);
            break;
        case "DELETE":
            const resultDelete = (await Delete(id)) as boolean;
            res.status(200).json(resultDelete);
            break;
        default:
            return res.status(404).send("Método não permitido");
            break;
    }
};
