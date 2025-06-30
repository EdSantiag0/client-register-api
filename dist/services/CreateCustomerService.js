"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerService = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class CreateCustomerService {
    async execute({ name, email }) {
        const customer = await prisma_1.default.customer.create({
            data: {
                name,
                email,
                status: true,
            },
        });
        return customer;
    }
}
exports.CreateCustomerService = CreateCustomerService;
