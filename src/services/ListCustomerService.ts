import prismaClient from "../prisma";

interface ListCustomerProps {
  id: string;
}

class ListCustomerService {
  async execute({ id }: ListCustomerProps) {
    if (!id) {
      throw new Error("Solicitação invalida (ID obrigatório).");
    }

    const findCustomer = await prismaClient.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não encontrado");
    }

    return findCustomer;
  }
}

export { ListCustomerService };
