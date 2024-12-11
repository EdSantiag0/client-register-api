import prismaClient from "../prisma";

interface UpdateCustomerProps {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  async execute({ id, name, email }: UpdateCustomerProps) {
    if (!id) {
      throw new Error("Solicitação invalida.");
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findCustomer) {
      throw new Error("Cliente não encontrado");
    }

    await prismaClient.customer.update({
      where: {
        id: findCustomer.id,
      },
      data: {
        name,
        email,
        status: true,
      },
    });

    return { message: "Cliente atualizado com sucesso!" };
  }
}

export { UpdateCustomerService };
