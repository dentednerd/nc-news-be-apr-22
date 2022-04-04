const db = require('../db/connection');

exports.selectArticleById = async (article_id) => {
  const queryStr = `
    SELECT *
    FROM articles
    WHERE article_id = $1;
  `;

  const queryValues = [article_id];

  const { rows } = await db.query(queryStr, queryValues);

  if (rows.length === 0) { // be explicit about rows.length here; we aren't 100% sure what the object coming back will be
    return Promise.reject({
      status: 404,
      msg: 'Article not found'
    });
  }

  return rows[0];
}
