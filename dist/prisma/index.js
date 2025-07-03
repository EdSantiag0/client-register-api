"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
prismaClient
    .$connect()
    .then(() => console.log("Conectado ao banco com sucesso!"))
    .catch((err) => console.error("Erro ao conectar ao banco:", err));
exports.default = prismaClient;
