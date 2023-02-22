import { PrismaClient } from "@prisma/client";

export const getCategorias = async () => {
    const prisma = new PrismaClient();
    try {
        const categorias = await prisma.categorias.findMany();
        return categorias;
    } catch (error) {
        console.log(error);
    }
};
