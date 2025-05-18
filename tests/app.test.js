const request = require('supertest');
const app = require('../index');

describe('GET /api/hello', () => {
  it('responds with json', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello from the API!' });
  });
});
