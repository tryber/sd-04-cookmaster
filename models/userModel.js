/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const db = await connection();
  const stmt = await db
    .getTable('users')
    .select(['email', 'password'])
    .where('email = :email')
    .bind('email', email)
    .execute();
  const rows = await stmt.fetchOne();
  const user = rows.reduce((email, password) => ({ email, password }));
  //console.log(rows) // objeto user
  return user;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const db = await connection();
  const stmt = await db
    .getTable('users')
    .select(['id', 'password'])
    .where('id = :id')
    .bind('id', id)
    .execute();
  const rows = await stmt.fetchOne();
  const users = rows.reduce((id, email, password) => ({ id, email, password }));
  return users;
  //console.log(users);
};

module.exports = {
  findByEmail,
  findById,
};
