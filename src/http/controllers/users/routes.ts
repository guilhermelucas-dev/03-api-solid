import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/vefify-jwt";

import { Authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', Authenticate); 

  app.patch('/token/refresh', refresh);


  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}