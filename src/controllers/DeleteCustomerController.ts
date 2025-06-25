import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const customerService = new DeleteCustomerService();

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

export { DeleteCustomerController };
