const conn = require('./connection');

const findByEmail = async (item) =>
  conn
    .connection()
    .then((db) =>
      db.getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name']).execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, email, password, name, lastName]) => ({
        id,
        email,
        password,
        name,
        lastName,
      })),
    )
    .then((res) => res.find((user) => user.email === item));

const findById = async (item) =>
  conn
    .connection()
    .then((db) =>
      db.getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name']).execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, email, password, name, lastName]) => ({
        id,
        email,
        password,
        name,
        lastName,
      })),
    )
    .then((res) => res.find((user) => user.id === item));

const createUser = (email, password, name, lastName) =>
  conn
    .connection()
    .then((db) =>
      db
        .getTable('users')
        .insert(['email', 'password', 'first_name', 'last_name'])
        .values(email, password, name, lastName)
        .execute(),
    );

module.exports = {
  findByEmail,
  findById,
  createUser,
};
