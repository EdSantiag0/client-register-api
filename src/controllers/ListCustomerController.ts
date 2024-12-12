import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomerService } from "../services/ListCustomerService";

class ListCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as {
      id: string;
    };

    const customerService = new ListCustomerService();
    const customer = await customerService.execute({ id });

    reply.send(customer);
  }
}

export { ListCustomerController };
