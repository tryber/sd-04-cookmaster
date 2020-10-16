const connection = require('./connection');

const insertUserModel = async (email, password, name, lastName) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.insert([
    'email', 'password', 'first_name', 'last_name',
  ])
  .values(email, password, name, lastName)
  .execute();
  return result.getWarningsCount();
};

module.exports = { insertUserModel };
