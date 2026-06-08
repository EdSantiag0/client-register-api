import prismaClient from "../prisma";
import { AppError } from "../errors/AppError";

class ListAllCustomersService {
  async execute() {
    try {
      const customers = await prismaClient.customer.findMany();

      return customers;
    } catch (error) {
      console.error("Erro ao buscar clientes no banco de dados:", error);
      throw new AppError("Falha ao encontrar clientes no banco de dados", 503);
    }
  }
}

export { ListAllCustomersService };
