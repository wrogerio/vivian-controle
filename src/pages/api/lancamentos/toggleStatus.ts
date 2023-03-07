import { NextApiRequest, NextApiResponse } from "next";
import { ToogleStatus } from "@/controllers/Lancamentos.Controler";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            const resultPost = (await ToogleStatus(req.body)) as boolean;
            res.status(201).send(resultPost);
            break;
        default:
            return res.status(404).send("Método não permitido");
            break;
    }
};
