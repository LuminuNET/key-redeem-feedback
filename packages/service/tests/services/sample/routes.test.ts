import request from 'supertest';
import promiseRequest from 'request-promise';
import { mockServer } from '../mockServer';
import { basePath } from '../../../src/middleware/common';

const router = mockServer();

describe('routes', () => {
  test('is working', async () => {
    console.error(basePath);
    const result = await request(router).get(`${basePath}/sample`);

    expect(result.body).toMatchObject({ is: 'working' });
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });
});
