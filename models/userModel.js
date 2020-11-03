const connection = require('./connection');

const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, emailDb, password, name, lastName]) => ({ id, emailDb, password, name, lastName }));
};

const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([idUser, email, password, name, lastName]) => ({ idUser, email, password, name, lastName }));
};

const createNewUser = async ({ email, password, first_name, last_name }) => {
  const db = await connection();
  await db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, first_name, last_name)
    .execute();
};

module.exports = {
  findByEmail,
  findById,
  createNewUser,
};
