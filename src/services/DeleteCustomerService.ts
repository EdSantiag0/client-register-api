import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

interface DeleteCustomerProps {
  id: string;
}

class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    try {
      const findCustomer = await prismaClient.customer.findFirst({
        where: {
          id: id,
        },
      });

      if (!findCustomer) {
        throw new AppError("Cliente não encontrado!", 404);
      }

      await prismaClient.customer.delete({
        where: {
          id: findCustomer.id,
        },
      });

      return {
        message: `Cliente ${findCustomer.name} foi deletado com sucesso!`,
      };
    } catch (error) {
      console.error("Erro ao deletar cliente no banco de dados:", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Falha ao deletar cliente no banco de dados", 503);
    }
  }
}

export { DeleteCustomerService };
