import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new  FetchNearByGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -19.494148,
      longitude: -41.073540
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -19.5073287,
      longitude: -40.9139479
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.494148,
      userLongitude: -41.073540
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym' }),
    ]);
  });

});