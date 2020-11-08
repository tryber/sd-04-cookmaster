const connection = require('./connection');

const findByEmail = async (mail) => {
  connection()
    .then((dataBase) =>
      dataBase
        .getTable('users')
        .select()
        .where('email = :email')
        .bind('email', mail)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, email, password, name, lastName]) => ({
      id,
      email,
      password,
      name,
      lastName,
    }));
};

const findById = async (id) => {
  connection()
    .then((dataBase) =>
      dataBase
        .getTable('users')
        .select()
        .where('id = :idParams')
        .bind('idParams', id)
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
