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
  });
});

describe('/api/articles/:article_id', () => {
  describe('GET', () => {
    test('200: returns an article object for article_id 1', async () => {
      const { body: { article } } = await request(app).get('/api/articles/1').expect(200);
      expect(article).toMatchObject({
        article_id: 1,
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '2020-07-09T20:11:00.000Z',
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        votes: 100
      });
    });

    test('400: returns "Invalid article ID" for an invalid article_id', async () => {
      const { body: { msg } } = await request(app).get('/api/articles/garbage').expect(400);
      expect(msg).toEqual('Bad request');
    });

    test('404: returns "Article not found" for a non-existent article_id', async () => {
      const { body: { msg } } = await request(app).get('/api/articles/9999').expect(404);
      expect(msg).toEqual('Article not found');
    });
  });

  describe('PATCH', () => {
    test('200: returns an article object in which the votes have been updated with the addition of the new vote', async () => {
      const { body: { article }} = await request(app)
        .patch('/api/articles/1')
        .send({
          inc_votes: 1
        })
        .expect(200);
      expect(article).toMatchObject({
        article_id: 1,
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '2020-07-09T20:11:00.000Z',
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        votes: 101
      });
    })
  });
});


describe('incorrect routes', () => {
  test('404: returns "Not found" for an incorrect route', async () => {
    const { body: { msg } } = await request(app).get('/garbage').expect(404);
    expect(msg).toEqual('Not found');
  });
});
