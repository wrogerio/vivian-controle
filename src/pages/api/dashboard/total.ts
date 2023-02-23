import { GetTotal } from "@/controllers/Dashboard.Controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { ano, mes } = req.body;
    await GetTotal(ano, mes).then((dados) => {
        res.send(dados);
    });
};
