const connection = require('./connection');

const findByEmail = async (emailInput) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select([])
        .where('email =:emailInput')
        .bind('emailInput', emailInput)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, firstName, lastName]) => ({
      id,
      email,
      password,
      firstName,
      lastName,
    }));
};

const findById = async (idInput) => {
  return connection()
    .then((db) =>
      db.getTable('users').select([]).where('id =:idInput').bind('idInput', idInput).execute(),
    )
    .then((result) => result.fetchOne())
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
};

module.exports = {
  findByEmail,
  findById,
};
