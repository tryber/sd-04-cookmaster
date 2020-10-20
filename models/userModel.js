const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} emailParam Email do usuário a ser encontrado
 */
const findByEmail = async (emailParam) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', emailParam)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }))
    .catch((err) => {
      throw err;
    });

/**
 * Busca um usuário através do seu ID
 * @param {string} idParam ID do usuário
 */
const findById = async (idParam) =>
  connection()
    .then((db) =>
      db.getTable('users').select([]).where('id = :param_id').bind('param_id', idParam)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));

/**
 * Adiciona um usuário
 * @param {string} email Email do usuário
 * @param {string} password Password do usuário
 * @param {string} firstName Primeiro nome do usuário
 * @param {string} lastName Sobrenome do usuário
 */
const addUser = async (firstName, lastName, email, password) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, password, firstName, lastName)
      .execute(),
  );

/**
 * Deleta um usuário através do seu ID
 * @param {string} idParam ID do usuário
 */
const deleteUser = async (idParam) =>
  connection().then((db) =>
    db.getTable('users').delete().where('id = :param_id').bind('param_id', idParam)
    .execute(),
  );

module.exports = {
  findByEmail,
  findById,
  addUser,
  deleteUser,
};
