import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCustomersService } from "../services/ListAllCustomersService";

class ListAllCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const listAllCustomersService = new ListAllCustomersService();
      const customers = await listAllCustomersService.execute();

      reply.send(customers);
    } catch (error) {
      console.error("Erro em ListAllCustomersController:", error);
      return reply.status(500).send({
        error: "Erro interno do servidor",
        detalhe: error instanceof Error ? error.message : String(error),
      });
    }
  }
}

export { ListAllCustomersController };
