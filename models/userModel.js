const connection = require('./connection');

const findByEmail = async (email) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([userId, userEmail, password, name, lastName]) => ({
      id: userId,
      email: userEmail,
      password,
      name,
      lastName,
    }));

const findById = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((result) => result.fetchAll()[0])
    .then(([userId, userEmail, password, name, lastName]) => ({
      id: userId,
      email: userEmail,
      password,
      name,
      lastName,
    }));

module.exports = {
  findByEmail,
  findById,
};
