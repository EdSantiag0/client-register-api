import { ListAllCustomersService } from "../../src/services/ListAllCustomersService";
import prismaClient from "../../src/prisma";

// Mock do prismaClient
jest.mock("../../src/prisma", () => ({
  __esModule: true,
  default: {
    customer: {
      findMany: jest.fn(),
    },
  },
}));

const mockedPrisma = prismaClient as jest.Mocked<typeof prismaClient>;

describe("ListAllCustomerService", () => {
  // 1ª Teste para listar todos os clientes
  it("deve listar todos os clientes", async () => {
    //Dados fake para o teste
    const fakeCustomers = [
      { id: "1", name: "Eduardo", email: "edu@example.com" },
      { id: "2", name: "Carla", email: "carla@example.com" },
    ];

    (mockedPrisma.customer.findMany as jest.Mock).mockResolvedValue(
      fakeCustomers
    );

    const service = new ListAllCustomersService();
    const result = await service.execute();

    expect(prismaClient.customer.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeCustomers);
  });

  // 2ª Teste para simular erro no prisma
  it("deve lançar erro quando o prisma falhar", async () => {
    const fakeError = new Error("Erro no banco");

    (mockedPrisma.customer.findMany as jest.Mock).mockRejectedValue(fakeError);

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const service = new ListAllCustomersService();

    await expect(service.execute()).rejects.toThrow("Erro no banco");

    consoleErrorSpy.mockRestore();
  });
});
