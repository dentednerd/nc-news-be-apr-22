const articlesRouter = require('./articles.router');
const topicsRouter = require('./topics.router');
const usersRouter = require('./users.router');

const apiRouter = require('express').Router();

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
