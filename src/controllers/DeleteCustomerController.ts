import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";
import { z } from "zod";

const deleteCustomerSchema = z.object({
  id: z.string().min(1, "ID é obrigatório"),
});
class DeleteCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = deleteCustomerSchema.parse(request.params);

      const customerService = new DeleteCustomerService();

      const customer = await customerService.execute({ id });

      if (!customer) {
        return reply.status(404).send({ error: "Cliente não encontrado" });
      }

      reply.send(customer);
    } catch (error: any) {
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

export { DeleteCustomerController };
