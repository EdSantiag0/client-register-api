import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCustomersService } from "../services/ListAllCustomersService";
import { z } from "zod";

const listAllCustomersSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});
class ListAllCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = listAllCustomersSchema.parse(request.query);

      const listAllCustomersService = new ListAllCustomersService();

      const customers = await listAllCustomersService.execute();

      reply.send(customers);
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

export { ListAllCustomersController };
