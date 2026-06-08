import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

interface UpdateCustomerProps {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  async execute({ id, name, email }: UpdateCustomerProps) {
    try {
      const findCustomer = await prismaClient.customer.findFirst({
        where: {
          id: id,
        },
      });

      if (!findCustomer) {
        throw new AppError("Cliente não encontrado", 404);
      }

      const emailAlreadyExists = await prismaClient.customer.findFirst({
        where: {
          email: email,
          NOT: {
            id: id,
          },
        },
      });

      if (emailAlreadyExists) {
        throw new AppError("Já existe um cliente com este email!", 409);
      }

      const updateCustomer = await prismaClient.customer.update({
        where: {
          id: findCustomer.id,
        },
        data: {
          name,
          email,
          status: true,
        },
      });

      return updateCustomer;
    } catch (error) {
      console.error("Erro ao atualizar cliente no banco de dados:", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Falha ao atualizar cliente no banco de dados", 503);
    }
  }
}

export { UpdateCustomerService };
