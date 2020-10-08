const connection = require('./connection');

const registerUser = async (email, password, firstName, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  return await table.insert([
    'email', 'password', 'firstName', 'lastName'
  ])
  .value(email, password, firstName, lastName)
  .execute();
};

module.exports = {
  registerUser,
};
