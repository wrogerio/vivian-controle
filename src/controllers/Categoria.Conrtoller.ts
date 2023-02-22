import { PrismaClient } from "@prisma/client";

export const getCategorias = async () => {
    const prisma = new PrismaClient();
    try {
        const categ = await prisma.categorias.findMany();
        return categ;
    } catch (error) {
        console.log(error);
    }
};
