"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomerController = void 0;
const UpdateCustomerService_1 = require("../services/UpdateCustomerService");
const zod_1 = require("zod");
const updateCustomerParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "ID é obrigatório"),
});
const updateCustomerBodySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
});
class UpdateCustomerController {
    async handle(request, reply) {
        try {
            const { id } = updateCustomerParamsSchema.parse(request.params);
            const { name, email } = updateCustomerBodySchema.parse(request.body);
            if (!id || !name || !email) {
                return reply
                    .status(400)
                    .send({ error: "Todos os campos são obrigatórios" });
            }
            const customerService = new UpdateCustomerService_1.UpdateCustomerService();
            const customer = await customerService.execute({ id, name, email });
            reply.status(200).send({
                message: "Cliente atualizado com sucesso!",
                customer,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return reply
                    .status(400)
                    .send({ error: error.errors.map((e) => e.message).join(", ") });
            }
            if (error.message === "Cliente não encontrado") {
                return reply.status(400).send({ error: error.message });
            }
            return reply.status(500).send({
                error: "Erro interno do servidor",
            });
        }
    }
}
exports.UpdateCustomerController = UpdateCustomerController;
