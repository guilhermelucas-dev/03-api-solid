import { CreateGymUseCase } from "../create-gym";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymRespository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}