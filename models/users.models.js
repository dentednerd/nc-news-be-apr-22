const db = require('../db/connection');

exports.selectAllUsers = async () => {
  const queryStr = `
    SELECT username
    FROM users;
  `;

  const { rows } = await db.query(queryStr);

  return rows;
}
