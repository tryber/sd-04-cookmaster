const connection = require('./connection');

const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userEmail, password, name, lastName]) => ({
      id,
      userEmail,
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
      db.getTable('users').select([]).where('id = :id_param').bind('id_param', id)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([userId, email, password, name, lastName]) => ({
      userId,
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
