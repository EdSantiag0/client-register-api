"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllCustomersService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListAllCustomersService {
    async execute() {
        console.log("Iniciando execução do serviço de listagem de clientes...");
        try {
            const customers = await prisma_1.default.customer.findMany();
            console.log("Clientes encontrados:", customers);
            return customers;
        }
        catch (error) {
            console.error("Erro no prisma.customer.findMany:", error);
            throw error;
        }
    }
}
exports.ListAllCustomersService = ListAllCustomersService;
