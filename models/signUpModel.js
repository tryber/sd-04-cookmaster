const connection = require('./connection');

const createUser = async (id, email, password, first_name, last_name) => {
  const db = await connection();
  const createRow = await db
    .getTable('users')
    .insert(['id', 'email', 'password', 'first_name', 'last_name'])
    .values(id, email, password, first_name, last_name)
    .execute();
};

module.exports = createUser;
