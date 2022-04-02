const db = require('../db/connection');

exports.selectArticleById = async (article_id) => {
  if(!/^[0-9]+$/.test(article_id)) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid article ID'
    });
  }

  const queryStr = `
    SELECT *
    FROM articles
    WHERE article_id = $1;
  `;

  const queryValues = [article_id];

  const article = await db
    .query(queryStr, queryValues)
    .then(({ rows }) => rows[0]);

  if (!article) {
    return Promise.reject({
      status: 404,
      msg: 'Article not found'
    });
  }

  return article;
}
