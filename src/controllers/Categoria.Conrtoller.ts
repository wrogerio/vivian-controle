import { PrismaClient } from "@prisma/client";

export const getCategorias = async () => {
    const prisma = new PrismaClient();
    const categ = await prisma.categorias.findMany({
        include: {
            Lancamentos: false,
        },
    });
    return categ;
};
