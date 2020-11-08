const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */

const findByEmail = async (email) => {
  return connection()
    .then((dataBase) =>
      dataBase
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, emailUser, password, name, lastName]) => ({
      id,
      emailUser,
      password,
      name,
      lastName,
    }));
};

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
