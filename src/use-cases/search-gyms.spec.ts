import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new  SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'JavaScritp Gym',
      description: null,
      phone: null,
      latitude: -19.494148,
      longitude: -41.073540
    });

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -19.494148,
      longitude: -41.073540
    });

    const { gyms } = await sut.execute({
      query: 'JavaScritp',
      page: 1
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScritp Gym' }),
    ]);
  });

  it.skip('should be able to fetch paginated gym search', async () => {

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScritp Gym ${i}`,
        description: null,
        phone: null,
        latitude: -19.494148,
        longitude: -41.073540
      });
    }
  
    const { gyms } = await sut.execute({
      query: 'JavaScritp',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ gym_id: 'JavaScritp Gym 21' }),
      expect.objectContaining({ gym_id: 'JavaScritp Gym 22' })
    ]);
  });
});