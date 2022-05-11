const { getArticleById, patchArticleVotes, getAllArticles } = require('../controllers/articles.controllers');

const articlesRouter = require('express').Router();

articlesRouter
  .route('/')
  .get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes);

module.exports = articlesRouter;
