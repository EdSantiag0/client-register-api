import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { request } from "http";

const app = Fastify({ logger: true });
const port = Number(process.env.PORT) || 3333;

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  await app.register(routes);

  try {
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
