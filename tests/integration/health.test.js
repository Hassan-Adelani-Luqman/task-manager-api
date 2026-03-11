const request = require('supertest');
const app = require('../../src/app');

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('includes uptime as a non-negative number', async () => {
    const res = await request(app).get('/health');
    expect(typeof res.body.uptime).toBe('number');
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
  });

  it('includes a valid ISO timestamp', async () => {
    const res = await request(app).get('/health');
    expect(res.body.timestamp).toBeDefined();
    expect(() => new Date(res.body.timestamp)).not.toThrow();
  });

  it('responds in under 200ms', async () => {
    const start = Date.now();
    await request(app).get('/health');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(200);
  });
});
