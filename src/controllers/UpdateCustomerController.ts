import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { name, email } = request.body as {
        name: string;
        email: string;
      };

      if (!id || !name || !email) {
        return reply
          .status(400)
          .send({ error: "Todos os campos são obrigatórios" });
      }

      const customerService = new UpdateCustomerService();

      const customer = await customerService.execute({ id, name, email });

      reply.status(200).send({
        message: "Cliente atualizado com sucesso!",
        customer,
      });
    } catch (error: any) {
      if (error.message === "Cliente não encontrado") {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  }
}

export { UpdateCustomerController };
