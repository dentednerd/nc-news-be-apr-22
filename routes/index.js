const articlesRouter = require('./articles');
const topicsRouter = require('./topics');

const apiRouter = require('express').Router();

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;
