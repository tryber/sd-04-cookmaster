const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto
const TEMP_USER = {
  id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
  email: 'taylor.doe@company.com',
  password: 'password',
  name: 'Taylor',
  lastName: 'Doe',
};
*/

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

function userObj(data) {
  return {
    id: data[0],
    email: data[1],
    password: data[2],
    name: data[3],
    lastName: data[4],
  };
}

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  const data = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchOne());

  const user = userObj(data);
  // console.log(data);
  // console.log(user);
  return user;
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  const data = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne());
  const user = userObj(data);
  return user;
};

module.exports = {
  findByEmail,
  findById,
};
