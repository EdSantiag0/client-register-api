import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

interface ListCustomerProps {
  id: string;
}

class ListCustomerService {
  async execute({ id }: ListCustomerProps) {
    try {
      const findCustomer = await prismaClient.customer.findUnique({
        where: {
          id: id,
        },
      });

      if (!findCustomer) {
        throw new AppError("Cliente não encontrado", 404);
      }

      return findCustomer;
    } catch (error) {
      console.error("Erro ao buscar cliente no banco de dados:", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Falha ao encontrar cliente no banco de dados", 503);
    }
  }
}

export { ListCustomerService };
