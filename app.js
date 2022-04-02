const express = require('express');
const { getTopics } = require('./controllers/topics.controllers');
const { handle404s } = require('./errorHandling');

const app = express();
app.use(express.json());

app.get('/api/topics', getTopics);

app.all('/*', handle404s);

module.exports = app;
