const connection = require('./connection'); //importar arquivo conexao

const signUpUserModel = async (email, password, name, lastname) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.insert([
    'email', 'password', 'name', 'lastname'
  ])
  .values(email, password, name, lastname)
  .execute();
  result.getWarningsCount();
};

module.exports = { signUpUserModel };
