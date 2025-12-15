import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

if (process.env.NODE_ENV !== "test") {
  prismaClient
    .$connect()
    .then(() => console.log("Conectado ao banco com sucesso!"))
    .catch((err) => console.error("Erro ao conectar ao banco:", err));
}

export default prismaClient;
