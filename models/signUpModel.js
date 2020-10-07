const connection = require('./connection'); //importar arquivo conexao

const signUpUserModel = async (email, password, first_name, last_name) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.insert([
    'email', 'password', 'first_name', 'last_name'
  ])
    .values(email, password, first_name, last_name)
    .execute();
  result.getWarningsCount();
};

module.exports = { signUpUserModel };
