"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class UpdateCustomerService {
    async execute({ id, name, email }) {
        const findCustomer = await prisma_1.default.customer.findFirst({
            where: {
                id: id,
            },
        });
        if (!findCustomer) {
            throw new Error("Cliente não encontrado");
        }
        const updateCustomer = await prisma_1.default.customer.update({
            where: {
                id: findCustomer.id,
            },
            data: {
                name,
                email,
                status: true,
            },
        });
        return updateCustomer;
    }
}
exports.UpdateCustomerService = UpdateCustomerService;
