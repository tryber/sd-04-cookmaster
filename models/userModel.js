const connection = require('./connection');

const findByEmail = async (userEmail) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('email = :email').bind('email', userEmail).execute();
  const [id, email, password, name, lastName] = await results.fetchOne();
  return { id, email, password, name, lastName };
};

const findById = async (userId) => {
  const db = await connection();
  const table = await db.getTable('users');
  const results = await table.select([]).where('id = :id').bind('id', userId).execute();
  const [id, email, password, name, lastName] = await results.fetchOne();
  return { id, email, password, name, lastName };
};

const editUser = async (id, email, password, firstName, lastName) => {
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
  editUser,
};
