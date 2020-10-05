const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

// /**
//  * Busca um usuário através do seu email e, se encontrado, retorna-o.
//  * @param {string} email Email do usuário a ser encontrado
//  */
const findByEmail = async (emailInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('email = :email').bind('email', emailInput).execute();
  const user = await result.fetchOne();

  if (!user) return null;

  const [id, email, password, name, lastName] = user;

  return { id, email, password, name, lastName };
};

// /**
//  * Busca um usuário através do seu ID
//  * @param {string} id ID do usuário
//  */
const findById = async (idInput) => {
  const db = await connection();
  const table = await db.getTable('users');
  const result = await table.select([]).where('id = :id').bind('id', idInput).execute();
  const [id, email, password, name, lastName] = await result.fetchOne();
  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
