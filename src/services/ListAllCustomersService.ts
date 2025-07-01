import prismaClient from "../prisma";

class ListAllCustomersService {
  async execute() {
    console.log("Executando ListAllCustomersService...");
    const customers = await prismaClient.customer.findMany();

    return customers;
  }
}

export { ListAllCustomersService };
