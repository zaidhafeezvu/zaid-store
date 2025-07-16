const request = require('supertest');
const app = require('../server');

describe('Server Foundation', () => {
  test('Health check endpoint should return success', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Server is running');
    expect(response.body.timestamp).toBeDefined();
  });

  test('Error handling middleware should handle 404', async () => {
    const response = await request(app)
      .get('/api/nonexistent')
      .expect(404);

    // Express default 404 handling
    expect(response.status).toBe(404);
  });
});