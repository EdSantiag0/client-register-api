import Fastify from "fastify";
import { routes } from "./routes";
import cors from "@fastify/cors";
import { request } from "http";

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  await app.register(cors, {
    origin: ["http://localhost:3333"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  });
  await app.register(routes);

  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
