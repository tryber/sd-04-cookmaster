const connection = require('./connection');

const createUser = async (email, password, firstName, lastName) => {
  connection()
    .then((db) =>
      db
        .getTable('users')
        .insert(['email', 'password', 'first_name', 'last_name'])
        .values(email, password, firstName, lastName)
        .execute(),
    );
};

module.exports = createUser;
