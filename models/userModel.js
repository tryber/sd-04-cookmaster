/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */

const connection = require('./connection');

// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

const findByEmail = async (userEmail) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password'])
    .where('email = :email')
    .bind('email', userEmail)
    .execute();
  const infoUser = await results.fetchOne();
  const [id, email, password] = infoUser;

  return { id, email, password };
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const infoUser = await results.fetchOne();

  const [id, email, password, name, lastName] = infoUser;

  return { id, email, password, name, lastName };
};

module.exports = {
  findByEmail,
  findById,
};
