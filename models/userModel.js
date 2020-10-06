const connection = require('./connection');

const findByEmail = async (userEmail) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('email = :email').bind('email', userEmail).execute();
  const [id, email, password, name, lastName] = await results.fetchOne();
  return { id, email, password, name, lastName };

};

const findById = async (userId) => {
  const db = await connection()
  const table = await db.getTable('users');
  const results = await table.select([]).where('id = :id').bind('id', userId).execute();
  const [id, email, password, name, lastName] = await results.fetchOne();
  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
