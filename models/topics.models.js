const db = require('../db/connection');

exports.fetchAllTopics = async () => {
  const queryStr = `
    SELECT *
    FROM topics;
  `;

  const { rows } = await db
    .query(queryStr);

  return rows;
}
