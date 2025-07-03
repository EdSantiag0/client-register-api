"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("✅ Iniciando servidor com CORS configurado...");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = require("./routes");
const app = (0, fastify_1.default)({ logger: true });
const port = Number(process.env.PORT) || 3333;
app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});
const start = async () => {
    try {
        await app.register(cors_1.default, {
            origin: (origin, cb) => {
                const allowedOrigins = [
                    "http://localhost:5173",
                    "http://localhost:3333",
                    "https://client-register-frontend.vercel.app",
                ];
                if (!origin || allowedOrigins.includes(origin)) {
                    cb(null, true);
                }
                else {
                    cb(new Error("Not allowed by CORS"), false);
                }
            },
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        });
        await app.register(routes_1.routes);
        await app.listen({ port, host: "0.0.0.0" });
        console.log("🚀 Server com CORS ativo!");
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
