import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Create Check-in (e2e)', () => {

  beforeAll( async () => {
    await app.ready();
  });

  afterAll( async () => {
    await app.close();
  });

  it('Check-in History', async() => {

    const { token } = await  createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '11999999',
        latitude: -19.494148,
        longitude: -41.073540
      }
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user.id
        },
        {
          gym_id: gym.id,
          user_id: user.id
        }
      ]
    });

    const response = await request(app.server)
    .get('/check-ins/history')
    .set('Authorization', `Bearer ${token}`)
    .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining(
        {
          gym_id: gym.id,
          user_id: user.id
        }
      )
    ])
  });
})