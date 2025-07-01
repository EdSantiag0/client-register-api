import prismaClient from "../prisma";

class ListAllCustomersService {
  async execute() {
    console.log("Iniciando execução do serviço de listagem de clientes...");
    try {
      const customers = await prismaClient.customer.findMany();
      console.log("Clientes encontrados:", customers);
      return customers;
    } catch (error) {
      console.error("Erro no prisma.customer.findMany:", error);
      throw error;
    }
  }
}

export { ListAllCustomersService };
