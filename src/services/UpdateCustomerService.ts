import prismaClient from "../prisma";

interface UpdateCustomerProps {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  async execute({ id, name, email }: UpdateCustomerProps) {
    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não encontrado");
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
  }
}

export { UpdateCustomerService };
