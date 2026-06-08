import { UpdateCustomerService } from "../../src/services/UpdateCustomerService";
import prismaClient from "../../src/prisma";

// Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    customer: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("UpdateCustomerService", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // 1ª - Teste para atualizar cliente
  it("deve atualizar um cliente existente", async () => {
    const service = new UpdateCustomerService();

    const mockCustomerFound = {
      id: "123",
      name: "Nome Antigo",
      email: "old@email.com",
      status: true,
    };

    const mockCustomerUpdated = {
      id: "123",
      name: "Nome Novo",
      email: "new@email.com",
      status: true,
    };

    (prismaClient.customer.findFirst as jest.Mock)
      .mockResolvedValueOnce(mockCustomerFound)
      .mockResolvedValueOnce(null);

    (prismaClient.customer.update as jest.Mock).mockResolvedValue(
      mockCustomerUpdated,
    );

    const result = await service.execute({
      id: "123",
      name: "Nome Novo",
      email: "new@email.com",
    });

    expect(result).toEqual(mockCustomerUpdated);
    expect(prismaClient.customer.findFirst).toHaveBeenCalledWith({
      where: { id: "123" },
    });
    expect(prismaClient.customer.update).toHaveBeenCalledWith({
      where: { id: mockCustomerFound.id },
      data: {
        name: "Nome Novo",
        email: "new@email.com",
        status: true,
      },
    });
  });

  // 2ª - Caso erre: cliente não encontrado
  it("deve lançar erro quando o cliente não existir", async () => {
    const service = new UpdateCustomerService();

    (prismaClient.customer.findFirst as jest.Mock).mockResolvedValue(null);

    try {
      await service.execute({
        id: "999",
        name: "Qualquer",
        email: "teste@email.com",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);

      expect((error as Error).message).toBe("Cliente não encontrado");
    }

    expect(prismaClient.customer.update).not.toHaveBeenCalled();
  });
});
