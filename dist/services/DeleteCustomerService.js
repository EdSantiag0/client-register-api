"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class DeleteCustomerService {
    async execute({ id }) {
        const findCustomer = await prisma_1.default.customer.findFirst({
            where: {
                id: id,
            },
        });
        if (!findCustomer) {
            throw new Error("Cliente não encontrado!");
        }
        await prisma_1.default.customer.delete({
            where: {
                id: findCustomer.id,
            },
        });
        return {
            message: `Cliente ${findCustomer.name} foi deletado com sucesso!`,
        };
    }
}
exports.DeleteCustomerService = DeleteCustomerService;
