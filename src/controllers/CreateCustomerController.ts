import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import { AppError } from "../errors/AppError";
import { z } from "zod";

const createCustomerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email } = createCustomerSchema.parse(request.body);

      const customerService = new CreateCustomerService();
      const customer = await customerService.execute({
        name,
        email: email.toLowerCase(),
      });

      reply.send(customer);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ error: error.errors.map((e) => e.message).join(", ") });
      }

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  }
}

export { CreateCustomerController };
