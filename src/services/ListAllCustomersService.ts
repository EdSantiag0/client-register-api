import prismaClient from "../prisma";

class ListAllCustomersService {
  async execute() {
    const customers = await prismaClient.customer.findMany();

    return customers;
  }
}

export { ListAllCustomersService };
