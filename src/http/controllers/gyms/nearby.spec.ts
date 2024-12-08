import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms (e2e)', () => {

  beforeAll( async () => {
    await app.ready();
  });

  afterAll( async () => {
    await app.close();
  });

  it('should be able list nearby gyms', async() => {

    const { token } = await  createAndAuthenticateUser(app, true);

   await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'JavaScript Gym',
      description: 'Some description',
      phone: '11999999',
      latitude: -19.494148,
      longitude: -41.073540
    });

    await request(app.server)
    .post('/gyms')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'TypeScript Gym',
      description: 'Some description',
      phone: '11999999',
      latitude: -19.5073287,
      longitude: -40.9139479
    });

    const response = await request(app.server)
    .get('/gyms/nearby')
    .query({
      latitude: -19.494148,
      longitude: -41.073540
    })
    .set('Authorization', `Bearer ${token}`)
    .send();
  
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ])
  });
})