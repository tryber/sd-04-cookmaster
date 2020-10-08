/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */

// const { connect } = require('mysql2');
const connection = require('./connection');

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email')
        .bind('email', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([idUser, emailUser, password, name, lastName]) => ({
      idUser,
      emailUser,
      password,
      name,
      lastName,
    }));
};

/**
 * Busca um usuário através do seu ID
 * @param {string} id ID do usuário
 */
const findById = async (id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id_var')
        .bind('id_var', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([idUser, email, password, name, lastName]) => ({
      idUser,
      email,
      password,
      name,
      lastName,
    }));
};

module.exports = {
  findByEmail,
  findById,
};
