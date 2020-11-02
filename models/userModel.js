const connection = require('./connection');

const add = async (email, password, firstName, lastName) => connection()
  .then((db) => db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute())
  .catch((error) => error);

const findByEmail = async (inputEmail) => connection()
  .then((db) => db
    .getTable('users')
    .select()
    .where('email = :email_param')
    .bind('email_param', inputEmail)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({
    id, email, password, name, lastName,
  }))
  .catch((error) => error);

const findById = async (inputId) => connection()
  .then((db) => db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id_param')
    .bind('id_param', inputId)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({
    id, email, password, name, lastName,
  }))
  .catch((error) => error);

const update = async (id, email, password, firstName, lastName) => connection()
  .then((db) => db
    .getTable('users')
    .update()
    .set('email', email)
    .set('password', password)
    .set('first_name', firstName)
    .set('last_name', lastName)
    .where('id = :id')
    .bind('id', id)
    .execute())
  .catch((error) => error);

module.exports = {
  add,
  findByEmail,
  findById,
  update,
};
