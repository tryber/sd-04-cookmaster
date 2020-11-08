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

const findById = async (userId) =>
  connection()
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

const registerNewUser = async (email, password, firstName, lastName) =>
connection()
  .then((db) => db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute(),
  );

const updateUser = async (id, email, password, firstName, lastName) =>
  connection()
    .then((db) => db
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
    );

module.exports = {
  findByEmail,
  findById,
  registerNewUser,
  updateUser,
};
