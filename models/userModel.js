const { connection } = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table
    .select([])
    .where('email = :email')
    .bind('email', emailInput)
    .execute();
  const [id, email, password, name, lastName] = results.fetchOne();
  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, email, password, name, lastName] = results.fetchOne();
  return { id, email, password, name, lastName };
};

const insertUser = async (email, password, first_name, last_name) => {
  const db = await connection();
  const table = await db.getTable('users');
  try {
    await table
      .insert(['email', 'password', 'firstName', 'lastName'])
      .values(email, password, firstName, lastName)
      .execute();
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = {
  findByEmail,
  findById,
  insertUser,
};
