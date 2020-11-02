const connection = require('./connection');

const findByEmail = async (userEmail) =>
  connection()
    .then((db) => db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', userEmail)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));

const findById = async (userId) => connection()
  .then((db) => db
    .getTable('users')
    .select()
    .where('id = :id')
    .bind('id', userId)
    .execute(),
  )
  .then((results) => results.fetchOne())
  .then(([id, email, password, firstName, lastName]) => ({
    id,
    email,
    password,
    firstName,
    lastName,
  }));

module.exports = {
  findByEmail,
  findById,
};
