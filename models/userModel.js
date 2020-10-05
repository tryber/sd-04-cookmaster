const connection = require('./connection');

const findByEmail = async (email) => {
  return connection()
    .then((db) =>
      db.getTable('users').select([]).where('email =:email').bind('email', email).execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, email, password, first_name, last_name]) => ({
      id,
      email,
      password,
      first_name,
      last_name,
    }));
};

const findById = async (id) => {
  return connection()
    .then((db) => db.getTable('users').select([]).where('id =:id').bind('id', id).execute())
    .then((result) => result.fetchOne())
    .then(([id, email, password, first_name, last_name]) => ({
      id,
      email,
      password,
      first_name,
      last_name,
    }));
};

module.exports = {
  findByEmail,
  findById,
};
