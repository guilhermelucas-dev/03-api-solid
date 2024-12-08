import { SearchGymsUseCase } from "../search-gyms";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymRespository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}