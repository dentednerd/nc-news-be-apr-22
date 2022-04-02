const db = require('../db/connection');

exports.fetchAllTopics = async () => {
  const queryStr = `
    SELECT *
    FROM topics;
  `;

  const topics = await db
    .query(queryStr)
    .then(({ rows }) => rows);

  if (!topics || !topics.length) {
    return Promise.reject({
      status: 404,
      msg: 'Topics not found'
    });
  }

  return topics;
}
