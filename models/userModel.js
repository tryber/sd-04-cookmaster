const connection = require('./connection');

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
        .where('email = :email_param')
        .bind('email_param', email)
        .execute(),
    )
    .then((results) => {
      return results.fetchOne();
    })
    .then(([userId, userEmail, password, name, lastName]) => ({
      id: userId,
      email: userEmail,
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
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([userId, userEmail, password, name, lastName]) => ({
      id: userId,
      email: userEmail,
      password,
      name,
      lastName,
    }));
};

const registerModel = async ({ email, password, name, lastName }) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .insert(['email', 'password', 'first_name', 'last_name'])
        .values(email, password, name, lastName)
        .execute(),
    );
};

const editUserModel = async (email, password, name, lastName, id) =>
  connection()
    .then((db) =>
      db
        .getTable('users')
        .update()
        .set('email', email)
        .set('password', password)
        .set('first_name', name)
        .set('last_name', lastName)
        .where('id = :id')
        .bind('id', id)
        .execute(),
    );

// const createUser = (email, password, name, lastName) => {
//   const query = `INSERT INTO Users (email, pass, first_name, last_name)
//   VALUES ('${email}', '${password}', '${name}', '${lastName}');`;
//   return new Promise((fulfill, reject) => {
//     config.query(query, (err, rows) => {
//       if (err) reject(err);
//       return fulfill(rows && rows[0]);
//     });
//   });
// };
// const listUsers = () => {
//   return new Promise((fulfill, reject) => {
//     config.query('SELECT * from Users', (er r, rows) => {
//       if (err) {
//         reject(err);
//       }

//       return fulfill(rows);
//     });
//   });
// };

module.exports = {
  findByEmail,
  findById,
  registerModel,
  editUserModel,
};
