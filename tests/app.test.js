
const request = require('supertest');
const app = require('../index'); // assuming this exports the Express app

describe('GET /api/hello', () => {
  it('responds with json', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Hello from API');
  });
});
