import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, replay: FastifyReply) {
    try {
      const { name, email } = request.body as { name: string; email: string };

      const customerService = new CreateCustomerService();
      const customer = await customerService.execute({ name, email });

      replay.send(customer);
    } catch (error) {
      return replay.status(500).send({
        error: "Erro interno do servidor",
      });
    }
  }
}

export { CreateCustomerController };
