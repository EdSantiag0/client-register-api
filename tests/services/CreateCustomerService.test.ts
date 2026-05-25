import { CreateCustomerService } from "../../src/services/CreateCustomerService";
import prismaClient from "../../src/prisma";

// Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    customer: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe("CreateCustomerService", () => {
  // 1ª - Teste para criar cliente
  it("deve criar um cliente com sucesso", async () => {
    const fakeCustomer = {
      id: "1",
      name: "Eduardo",
      email: "edu@example.com",
      status: true,
    };

    (prismaClient.customer.findFirst as jest.Mock).mockResolvedValue(null);
    (prismaClient.customer.create as jest.Mock).mockResolvedValue(fakeCustomer);

    const service = new CreateCustomerService();

    const result = await service.execute({
      name: "Eduardo",
      email: "edu@example.com",
    });

    expect(result).toEqual(fakeCustomer);
  });
});
