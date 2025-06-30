"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class ListCustomerService {
    async execute({ id }) {
        const findCustomer = await prisma_1.default.customer.findUnique({
            where: {
                id: id,
            },
        });
        if (!findCustomer) {
            throw new Error("Cliente não encontrado");
        }
        return findCustomer;
    }
}
exports.ListCustomerService = ListCustomerService;
