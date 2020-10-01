const conn = require('./connection');
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
const findByEmail = async (item) =>
  conn
    .connection()
    .then((db) =>
      db.getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name']).execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, email, password, name, lastName]) => ({
        id,
        email,
        password,
        name,
        lastName,
      })),
    )
    .then((res) => res.find((user) => user.email === item));

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (item) =>
  conn
    .connection()
    .then((db) =>
      db.getTable('users').select(['id', 'email', 'password', 'first_name', 'last_name']).execute(),
    )
    .then((results) => results.fetchAll())
    .then((users) =>
      users.map(([id, email, password, name, lastName]) => ({
        id,
        email,
        password,
        name,
        lastName,
      })),
    )
    .then((res) => res.find((user) => user.id === item));

module.exports = {
  findByEmail,
  findById,
};
