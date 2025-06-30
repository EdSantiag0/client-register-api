"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomerController = void 0;
const CreateCustomerService_1 = require("../services/CreateCustomerService");
const zod_1 = require("zod");
const createCustomerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
});
class CreateCustomerController {
    async handle(request, replay) {
        try {
            const { name, email } = createCustomerSchema.parse(request.body);
            const customerService = new CreateCustomerService_1.CreateCustomerService();
            const customer = await customerService.execute({
                name,
                email: email.toLowerCase(),
            });
            replay.send(customer);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return replay
                    .status(400)
                    .send({ error: error.errors.map((e) => e.message).join(", ") });
            }
            return replay.status(500).send({
                error: "Erro interno do servidor",
            });
        }
    }
}
exports.CreateCustomerController = CreateCustomerController;
