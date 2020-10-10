const connection = require('./connection');

const registerUser = async (email, password, firstName, lastName) => {
  const db = await connection();
  console.log('DB: ', db)
  const table = await db.getTable('users');
  console.log('Table: ', table)
  const insertUser = await table.insert([
    'email', 'password', 'first_name', 'last_name'
  ])
  .values(email, password, firstName, lastName)
  .execute();
  return insertUser;
};

module.exports = {
  registerUser,
};
