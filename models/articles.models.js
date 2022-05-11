const db = require('../db/connection');

exports.selectArticleById = async (article_id) => {
  const queryStr = `
    SELECT articles.*,
    COUNT(comments.comment_id) :: INT AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    LIMIT 1;
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

exports.updateArticleVotes = async (article_id, inc_votes) => {
  const queryStr = `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;
  `;

  const queryValues = [inc_votes, article_id];

  const { rows } = await db.query(queryStr, queryValues);

  if (rows.length === 0) {
    return Promise.reject({
      status: 404,
      msg: 'Article not found'
    });
  }

  return rows[0];
}
