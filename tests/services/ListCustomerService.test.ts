import { ListCustomerService } from "../../src/services/ListCustomerService";
import prismaClient from "../../src/prisma";

// Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  customer: {
    findUnique: jest.fn(),
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
      fakeCustomer
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

    await expect(service.execute({ id: "999" })).rejects.toThrow(
      "Cliente não encontrado"
    );
  });
});
