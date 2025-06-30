"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCustomerController = void 0;
const DeleteCustomerService_1 = require("../services/DeleteCustomerService");
const zod_1 = require("zod");
const deleteCustomerSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID é obrigatório"),
});
class DeleteCustomerController {
    async handle(request, reply) {
        try {
            const { id } = deleteCustomerSchema.parse(request.params);
            const customerService = new DeleteCustomerService_1.DeleteCustomerService();
            const customer = await customerService.execute({ id });
            if (!customer) {
                return reply.status(404).send({ error: "Cliente não encontrado" });
            }
            reply.send(customer);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply
                    .status(400)
                    .send({ error: error.errors.map((e) => e.message).join(", ") });
            }
            return reply.status(500).send({
                error: "Erro interno do servidor",
            });
        }
    }
}
exports.DeleteCustomerController = DeleteCustomerController;
