import { FastifyInstance } from "fastify";
import { hashPassword } from "../../utils/hash";
import { users } from "./auth.store";
import { randomUUID } from "crypto";
import { logger } from "../../config/logger";
import { verifyAccessToken, signAccessToken } from "../../utils/jwt";
import { comparePassword } from "../../utils/hash";
import { usersRepository } from "../users/v1/user.repository";
export async function authRoutes(app: FastifyInstance) {
  app.post("/register",
    
    
    {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          role: {
            type: "string",
            enum: ["USER", "ADMIN"],
            default: "USER",
          },
        },
      },
    },
  },
    
    async (request, reply) => {
    const { email, password } = request.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password are required",
      });
    }

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return reply.status(409).send({
        message: "User already exists",
      });
    }
    const passwordHash = await hashPassword(password);
   
    const user = await usersRepository.create({
      email,
      passwordHash
    });

    logger.info(email);
    return reply.status(201).send({
      message: "User registered successfully",
    });
  });

  app.post("/login",
    
    {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
        },
      },
    },
  },
    
     async (request, reply) => {
    const { email, password } = request.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      return reply.status(400).send({
        message: "Email and password are required",
      });
    }
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }
    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return reply.status(401).send({
        message: "Invalid credentials",
      });
    }
    const accessToken = signAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      plan:user.plan ?? "FREE",
    });
    return reply.send({
      accessToken,
    });
  });
}
