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

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const table = await connection().then((db) => db.getTable('users'));
  const register = await table
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('email = :email')
    .bind('email', email)
    .execute();

  return register.fetchAll()
    .map(([id, email, password, firstName, lastName]) =>
      ({ id, email, password, firstName, lastName }))[0];
};

// === Versão com then ===
// connection()
//   .then((db) =>
//     db.getTable('users')
//       .select(['id', 'email', 'password', 'first_name', 'last_name'])
//       .where('email = :email')
//       .bind('email', email)
//       .execute()
//   )
//   .then((result) => result.fetchAll())
//   .then((user) => user);

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const table = await connection().then((db) => db.getTable('users'));
  const register = await table
    .select(['id', 'email', 'password', 'first_name', 'last_name'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  return register.fetchAll()
    .map(([id, email, password, firstName, lastName]) =>
      ({ id, email, password, firstName, lastName }))[0];
};

// === IIFE teste ===
// (async () => console.log(await findById(3)))();

module.exports = {
  findByEmail,
  findById,
};
