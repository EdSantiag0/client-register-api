import { ListCustomerService } from "../../src/services/ListCustomerService";
import prismaClient from "../../src/prisma";

// Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    customer: {
      findUnique: jest.fn(),
    },
  },
}));

describe("ListCustomerService", () => {
  // 1ª - Teste para listar cliente por ID
  it("deve retornar um cliente quando ID existir", async () => {
    const service = new ListCustomerService();

    const fakeCustomer = {
      id: "1",
      name: "Eduardo",
      email: "edu@example.com",
    };

    (prismaClient.customer.findUnique as jest.Mock).mockResolvedValue(
      fakeCustomer,
    );

    const result = await service.execute({ id: "1" });

    expect(result).toEqual(fakeCustomer);
    expect(prismaClient.customer.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  // 2ª - Caso erre: cliente não encontrado
  it("deve lançar erro quando o cliente não for encontrado", async () => {
    const service = new ListCustomerService();

    (prismaClient.customer.findUnique as jest.Mock).mockResolvedValue(null);

    try {
      await service.execute({ id: "999" });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe("Cliente não encontrado");
    }
  });
});
