"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const CreateCustomerController_1 = require("./controllers/CreateCustomerController");
const ListAllCustomersController_1 = require("./controllers/ListAllCustomersController");
const ListCustomerController_1 = require("./controllers/ListCustomerController");
const DeleteCustomerController_1 = require("./controllers/DeleteCustomerController");
const UpdateCustomerController_1 = require("./controllers/UpdateCustomerController");
async function routes(fastify, options) {
    fastify.get("/teste", async (request, reply) => {
        return { ok: true };
    });
    fastify.post("/customer", async (request, reply) => {
        return new CreateCustomerController_1.CreateCustomerController().handle(request, reply);
    });
    fastify.get("/customers", async (request, reply) => {
        return new ListAllCustomersController_1.ListAllCustomersController().handle(request, reply);
    });
    fastify.get("/customer/:id", async (request, reply) => {
        return new ListCustomerController_1.ListCustomerController().handle(request, reply);
    });
    fastify.delete("/customer/:id", async (request, reply) => {
        return new DeleteCustomerController_1.DeleteCustomerController().handle(request, reply);
    });
    fastify.put("/customer/:id", async (request, reply) => {
        return new UpdateCustomerController_1.UpdateCustomerController().handle(request, reply);
    });
}
