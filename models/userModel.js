const connection = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .select()
    .where('email = :emailInput')
    .bind('emailInput', emailInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchAll()[0];
  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select().where('id = :idInput').bind('idInput', idInput).execute();
  const [id, email, password, name, lastName] = await result.fetchAll()[0];
  return { id, email, password, name, lastName };
};

// -------------------------------------------------
// -------------------------------------------------

// Criar novo usuário
const createUser = (email, password, first_name, last_name) => {
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, first_name, last_name)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  createUser,
};
