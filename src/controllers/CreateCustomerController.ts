import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import { z } from "zod";

const createCustomerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

class CreateCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    try {
      const { name, email } = createCustomerSchema.parse(request.body);

      const customerService = new CreateCustomerService();
      const customer = await customerService.execute({
        name,
        email: email.toLowerCase(),
      });

      replay.send(customer);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
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

export { CreateCustomerController };
