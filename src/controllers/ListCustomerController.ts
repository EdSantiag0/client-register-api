import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";
import { z } from "zod";

const listCustomerSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = listCustomerSchema.parse(request.params);

      const customerService = new ListCustomerService();
      const customer = await customerService.execute({ id });

      if (!customer) {
        return reply.status(404).send({ error: "Cliente não encontrado" });
      }

      reply.send(customer);
    } catch (error) {
      if (error instanceof z.ZodError) {
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

export { ListCustomerController };
