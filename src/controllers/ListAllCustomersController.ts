import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCustomersService } from "../services/ListAllCustomersService";
import { AppError } from "../errors/AppError";

class ListAllCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const listAllCustomersService = new ListAllCustomersService();
      const customers = await listAllCustomersService.execute();

      return reply.status(200).send(customers);
    } catch (error: any) {
      console.error("Erro em ListAllCustomersController:", error);

      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  }
}

export { ListAllCustomersController };
