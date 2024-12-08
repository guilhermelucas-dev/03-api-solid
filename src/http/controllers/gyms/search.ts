import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  });

  const { query, page } = searchGymQuerySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    query: query,
    page: page,
  });

  return reply.status(200).send({
    gyms
  });
}