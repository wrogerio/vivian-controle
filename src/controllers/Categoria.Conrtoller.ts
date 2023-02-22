import { PrismaClient } from "@prisma/client";

export const getCategorias = async () => {
    try {
        const prisma = new PrismaClient();
        const categorias = await prisma.Categorias.findMany();
        return categorias;
    } catch (error) {
        console.log(error);
    }
};
