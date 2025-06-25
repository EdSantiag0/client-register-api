import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as {
        id: string;
      };

      const customerService = new ListCustomerService();
      const customer = await customerService.execute({ id });

      if (!customer) {
        return reply.status(404).send({ error: "Cliente não encontrado" });
      }

      reply.send(customer);
    } catch (error) {
      return reply.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  }
}

export { ListCustomerController };
