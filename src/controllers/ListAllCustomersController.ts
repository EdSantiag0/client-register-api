import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCustomersService } from "../services/ListAllCustomersService";

class ListAllCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllCustomersService = new ListAllCustomersService();

    const customers = await listAllCustomersService.execute();

    reply.send(customers);
  }
}

export { ListAllCustomersController };
