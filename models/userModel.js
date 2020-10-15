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
const findByEmail = async (userEmail) => {
  const db = await connection();
  const stmt = await db
    .getTable('users')
    .select([])
    .where('email = :email')
    .bind('email', userEmail)
    .execute();
  const [id, email, password, name, lastName] = await stmt.fetchOne();
  const users = { id, email, password, name, lastName };
  // console.log(users);
  return users;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const db = await connection();
  const stmt = await db
    .getTable('users')
    .select([])
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const [id, email, password, name, lastName] = await stmt.fetchOne();
  const users = { id, email, password, name, lastName };
  // console.log(users);
  return users;
};

// ? verificar o cadastro de pessoas com o mesmo email
const newUser = async (email, password, name, lastName) => {
  const db = await connection();
  const user = db
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, name, lastName)
    .execute();
  return user;
};

module.exports = {
  findByEmail,
  findById,
  newUser,
};
