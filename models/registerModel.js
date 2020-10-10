const connection = require('./connection');

const registerUser = async (email, password, firstName, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  const insertUser = await table.insert([
    'email', 'password', 'first_name', 'last_name',
  ])
  .values(email, password, firstName, lastName)
  .execute();
  return insertUser;
};

module.exports = {
  registerUser,
};
