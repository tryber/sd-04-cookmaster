const connection = require('./connection');

const signUpUserModel = async (email, password, firstName, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, firstName, lastName)
    .execute();
  result.getWarningsCount();
};

module.exports = { signUpUserModel };
