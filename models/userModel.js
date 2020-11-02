const connection = require('./connection')

const findByEmail = async (email) => 
  connection()
    .then((db) => db
      .getTable('users')
      .select()
      .where('email = :email')
      .bind('email', email)
      .execute()
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName
    }));

const findById = async (id) => connection()
  .then((db) => db
    .getTable('users')
    .select()
    .where('id = :id')
    .bind('id', id)
    .execute()
  )
  .then((results) => results.fetchOne())
  .then(([id, email, password, firstName, lastName]) => ({
    id,
    email,
    password,
    firstName,
    lastName
  }));

module.exports = {
  findByEmail,
  findById,
};
