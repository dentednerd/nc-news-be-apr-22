const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { getArticleById, patchArticleVotes } = require('./controllers/articles.controllers');
const { handle404s, handleCustomErrors, handlePSQLErrors } = require('./errorHandling');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleVotes);

app.all('/*', handle404s);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);

module.exports = app;
