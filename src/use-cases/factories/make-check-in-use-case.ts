import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "../check-in";
import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRespository();
  const gymsRepository = new PrismaGymRespository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;

}