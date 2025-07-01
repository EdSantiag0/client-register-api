import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

prismaClient
  .$connect()
  .then(() => console.log("Conectado ao banco com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

export default prismaClient;
