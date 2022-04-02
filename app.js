const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { getArticleById } = require('./controllers/articles.controllers');
const { handle404s, handleCustomErrors } = require('./errorHandling');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);

app.all('/*', handle404s);
app.use(handleCustomErrors);

module.exports = app;
