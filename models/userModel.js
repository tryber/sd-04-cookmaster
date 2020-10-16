const connection = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('email = :email').bind('email', emailInput).execute();
  const user = await result.fetchOne();

  if (!user) return null;

  const [id, email, password, name, lastName] = user;

  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
