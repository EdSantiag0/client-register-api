import { DeleteCustomerService } from "../../src/services/DeleteCustomerService";
import prismaClient from "../../src/prisma";
import exp from "constants";

//Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    customer: {
      findFirst: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const mockedPrisma = prismaClient as jest.Mocked<typeof prismaClient>;

// Limpa os mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});

describe("DeleteCustomerService", () => {
  // 1ª - Teste para deletar cliente
  it("deve deletar um cliente existente", async () => {
    const fakeCustomer = {
      id: "1",
      name: "Eduardo",
      email: "edu@example.com",
    };

    (mockedPrisma.customer.findFirst as jest.Mock).mockResolvedValue(
      fakeCustomer
    );

    (mockedPrisma.customer.delete as jest.Mock).mockResolvedValue(fakeCustomer);
    (prismaClient.customer.delete as jest.Mock).mockResolvedValue(fakeCustomer);

    const service = new DeleteCustomerService();
    const result = await service.execute({ id: "1" });

    expect(mockedPrisma.customer.findFirst).toHaveBeenCalledTimes(1);
    expect(mockedPrisma.customer.delete).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      message: `Cliente ${fakeCustomer.name} foi deletado com sucesso!`,
    });
  });

  // 2ª - Caso erre: cliente não encontrado
  it("deve lançar erro caso o cliente não exista", async () => {
    (mockedPrisma.customer.findFirst as jest.Mock).mockResolvedValue(null);

    const service = new DeleteCustomerService();

    await expect(service.execute({ id: "999" })).rejects.toThrow(
      "Cliente não encontrado!"
    );

    expect(mockedPrisma.customer.delete).not.toHaveBeenCalled();
  });

  // 3ª - Caso de erro no Prisma
  it("deve lançar erro caso o Prisma falhe", async () => {
    (mockedPrisma.customer.findFirst as jest.Mock).mockResolvedValue({
      id: "1",
      name: "João",
    });

    (mockedPrisma.customer.delete as jest.Mock).mockRejectedValue(
      new Error("Erro ao deletar no banco")
    );

    const service = new DeleteCustomerService();

    await expect(service.execute({ id: "1" })).rejects.toThrow(
      "Erro ao deletar no banco"
    );
  });
});
