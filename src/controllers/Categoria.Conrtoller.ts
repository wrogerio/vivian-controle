import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategorias = async () => {
    try {
        const categorias = await prisma.Categorias.findMany();
        return categorias;
    } catch (error) {
        console.log(error);
    }
};
