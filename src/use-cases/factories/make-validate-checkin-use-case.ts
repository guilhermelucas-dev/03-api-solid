import { PrismaCheckInsRespository } from "@/repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRespository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;

}