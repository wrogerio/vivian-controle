import { NextApiRequest, NextApiResponse } from "next";
import { GetGastoPorDia } from "@/controllers/Dashboard.Controller";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { ano, mes, dia } = req.body;
    await GetGastoPorDia(ano, mes, dia).then((dados) => {
        res.send(dados);
    });
};
