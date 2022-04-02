const request = require('supertest');
const testData = require('../db/data/test-data');
const db = require('../db/connection');
const seed = require('../db/seeds/seed')
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/topics', () => {
  describe('GET', () => {
    test('200: returns an array of topic objects with slug and description', async () => {
      const { body: { topics } } = await request(app).get('/api/topics').expect(200);
        topics.forEach((topic) => {
        expect(topic.slug).toEqual(expect.any(String));
        expect(topic.description).toEqual(expect.any(String));
      });
    });

    test('404: returns "Not found" for an incorrect route', async () => {
      const { body: { msg } } = await request(app).get('/api/garbage').expect(404);
      expect(msg).toEqual('Not found');
    });
  });
});
