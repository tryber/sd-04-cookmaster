// depois de muita tentativa entramos em call Orlando,
// Tereza e Mathieu e esse código abaixo foi reescrito
// baseado no código do Orlando

const connection = require('./connection');

const findByEmail = async (emailInput) => {
  const db = await connection();
  const result = await db
    .getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', emailInput)
    .execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

const addUser = async (email, password, firstName, lastName) => {
  const db = await connection();
  return db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
};

const updateUser = async (id, email, password, firstName, lastName) => {
  const db = await connection();
  return db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', firstName)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  updateUser,
};
