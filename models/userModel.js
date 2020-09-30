const { connection } = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('email = :emailInput').bind({ emailInput }).execute();
  const [id, email, password, name, lastName] = results.fetchOne();
  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('id = :idInput').bind({ idInput }).execute();
  const [id, email, password, name, lastName] = results.fetchOne();
  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
