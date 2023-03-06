import { NextApiRequest, NextApiResponse } from "next";
import { GetAll } from "@/controllers/Status.Controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            GetAll()
                .then((dados: any) => {
                    res.status(200).json(dados);
                })
                .catch((err: any) => {
                    res.status(500).send(err);
                });
            break;
        default:
            return res.status(404).send("Método não permitido");
            break;
    }
};
