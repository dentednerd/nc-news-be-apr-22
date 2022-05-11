const express = require('express');
const apiRouter = require('./routes');
const { handle404s, handleCustomErrors, handlePSQLErrors } = require('./errorHandling');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);
app.all('/*', handle404s);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);

module.exports = app;
