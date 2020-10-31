const connection = require('./connection');

const createUser = ({ email, password, password_comparisor, first_name, last_name }) => {
  return connection()
  .then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, first_name, last_name)
      .execute(),
  )
}

module.exports = {
  createUser,
}