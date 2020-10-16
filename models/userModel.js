const connection = require('./connection');

const findByEmail = async (emailInput) => connection()
  .then((db) => db
    .getTable('users')
    .select()
    .where('email = :email_param')
    .bind('email_param', emailInput)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({
    id, email, password, name, lastName,
  }))
  .catch((error) => error);

const findById = async (idInput) => connection()
  .then((db) => db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id_param')
    .bind('id_param', idInput)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, email, password, name, lastName]) => ({
    id, email, password, name, lastName,
  }))
  .catch((error) => error);

module.exports = {
  findByEmail,
  findById,
};
