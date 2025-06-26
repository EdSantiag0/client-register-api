import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCustomerService } from "../services/UpdateCustomerService";
import { z } from "zod";

const updateCustomerParamsSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

const updateCustomerBodySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
});

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = updateCustomerParamsSchema.parse(request.params);
      const { name, email } = updateCustomerBodySchema.parse(request.body);

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
      if (error instanceof z.ZodError) {
        return reply
          .status(400)
          .send({ error: error.errors.map((e) => e.message).join(", ") });
      }
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
