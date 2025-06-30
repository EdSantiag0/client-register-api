"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)({ logger: true });
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});
const start = async () => {
    await app.register(cors_1.default, {
        origin: ["http://localhost:5173", "http://localhost:3333"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    });
    await app.register(routes_1.routes);
    try {
        await app.listen({ port: 3333, host: "0.0.0.0" });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
