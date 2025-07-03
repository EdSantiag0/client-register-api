"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllCustomersController = void 0;
const ListAllCustomersService_1 = require("../services/ListAllCustomersService");
class ListAllCustomersController {
    async handle(request, reply) {
        try {
            const listAllCustomersService = new ListAllCustomersService_1.ListAllCustomersService();
            const customers = await listAllCustomersService.execute();
            reply.send(customers);
        }
        catch (error) {
            console.error("Erro em ListAllCustomersController:", error);
            return reply.status(500).send({
                error: "Erro interno do servidor",
                detalhe: error instanceof Error ? error.message : String(error),
            });
        }
    }
}
exports.ListAllCustomersController = ListAllCustomersController;
