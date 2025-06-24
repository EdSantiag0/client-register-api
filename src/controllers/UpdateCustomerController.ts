import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
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
  }
}

export { UpdateCustomerController };
