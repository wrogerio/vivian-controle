import { NextApiRequest, NextApiResponse } from "next";
import { GetGastoDiario } from "@/controllers/Dashboard.Controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { ano, mes } = req.body;
    await GetGastoDiario(ano, mes).then((dados) => {
        res.send(dados);
    });
};
