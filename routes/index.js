const articlesRouter = require('./articles');
const topicsRouter = require('./topics');
const usersRouter = require('./users');

const apiRouter = require('express').Router();

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
