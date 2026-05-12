import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

interface CreateCustomerProps {
  name: string;
  email: string;
}

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    try {
      const existingCustomer = await prismaClient.customer.findFirst({
        where: {
          email: email,
        },
      });

      if (existingCustomer) {
        throw new AppError("Já existe um cliente com este email!", 409);
      }

      const customer = await prismaClient.customer.create({
        data: {
          name,
          email,
          status: true,
        },
      });

      return customer;
    } catch (error) {
      console.error("Erro ao criar cliente no banco de dados:", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("Falha ao criar cliente no banco de dados", 503);
    }
  }
}

export { CreateCustomerService };
