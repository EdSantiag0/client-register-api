import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = Fastify({ logger: true });
const port = Number(process.env.PORT) || 3333;

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

app.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3333",
      "https://client-register-frontend.vercel.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.register(routes);

const start = async () => {
  try {
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

app.get("/ping", async () => {
  return { pong: true };
});

start();
