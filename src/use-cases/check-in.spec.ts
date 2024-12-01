import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';


let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Register Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    // gymsRepository.items.push({
    //   id: 'gym-01',
    //   title: 'JavasScript Gym',
    //   description: '',
    //   phone: '',
    //   latitude: new Decimal(-19.494148),
    //   longitude: new Decimal(-41.073540)
    // });

    await gymsRepository.create({
      id: 'gym-01',
      title: 'JavasScript Gym',
      description: '',
      phone: '',
      latitude: -19.494148,
      longitude: -41.073540
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));
    
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    });

    await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0));
    
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    });

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavasScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-19.49348),
      longitude: new Decimal(-41.0631915)
    });

    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user_01',
      userLatitude: -19.494148,
      userLongitude: -41.073540,
    })).rejects.toBeInstanceOf(MaxDistanceError); 
  });
});