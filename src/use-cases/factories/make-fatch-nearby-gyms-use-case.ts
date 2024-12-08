import { FetchNearByGymsUseCase } from "../fetch-nearby-gyms";
import { PrismaGymRespository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymRespository();
  const useCase = new FetchNearByGymsUseCase(gymsRepository);

  return useCase;
}