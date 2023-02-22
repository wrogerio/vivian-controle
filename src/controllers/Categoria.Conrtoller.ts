import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategorias = async () => {
    const categ = await prisma.categorias.findMany({
        include: {
            Lancamentos: false,
        },
    });
    return categ;
};
