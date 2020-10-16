const connection = require('./connection');

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = (emailParam) =>
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
 * @param {string} id ID do usuário
 */
const findById = async (idParam) =>
  connection()
    .then((db) =>
      db.getTable('users')
      .select([])
      .where('id = :param_id')
      .bind('param_id', idParam)
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

module.exports = {
  findByEmail,
  findById,
};
