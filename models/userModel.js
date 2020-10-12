const connection = require('./connection');

const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, emailDb, password, name, lastName]) =>
    ({ id, emailDb, password, name, lastName }));
};

// listar todos os usuarios
// const FindAll = async () => {
//   return connection()
//     .then((db) => db.getTable('user'.select(['id', 'email', 'first_name', 'last_name']).execute()))
//     .then((results) => results.fetchAll())
//     .then((user) =>
//       user.map(([id, email, /*first_name, last_name*/]) => ({ id, email, /*firtsName, lastName*/ })),
//     );
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

/**
 * Busca um usuário através do seu ID
//  * @param {string} id ID do usuário
 */

const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([idDb, email, password, name, lastName]) =>
    ({ idDb, email, password, name, lastName }));
};

module.exports = {
  findByEmail,
  findById,
};
