const { getArticleById, patchArticleVotes } = require('../controllers/articles.controllers');

const articlesRouter = require('express').Router();

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes);

module.exports = articlesRouter;
