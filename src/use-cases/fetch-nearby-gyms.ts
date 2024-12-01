import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface  FetchNearbyGymsCaseResponse {
  gyms: Gym[];
}

export class FetchNearByGymsUseCase
{
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsCaseResponse> {
   const gyms = await this.gymRepository.findManyNearby({
    latitude: userLatitude,
    longitude: userLongitude
   });

    return {
      gyms,
    };
  }
}