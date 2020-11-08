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
    .then((dataBase) =>
      dataBase
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
const createUser = async ({ email, password, first_name, last_name }) => {
  const dataBase = await connection();
  await dataBase
    .getTable('users')
    .insert(['email', 'password', 'first_name', 'last_name'])
    .values(email, password, first_name, last_name)
    .execute();
};

const editUser = async (id, email, password, fName, lName) => {
  connection().then((dataBase) =>
    dataBase
      .getTable('users')
      .update()
      .set('email', email)
      .set('password', password)
      .set('first_name', fName)
      .set('last_name', lName)
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );
};

module.exports = {
  findByEmail,
  findById,
  createUser,
  editUser,
};
