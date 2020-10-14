const connection = require('./connection');

/* Quando você implementar a conexão com o banco, não deve mais precisar desse objeto */
// const TEMP_USER = {
//   id: 'd2a667c4-432d-4dd5-8ab1-b51e88ddb5fe',
//   email: 'taylor.doe@company.com',
//   password: 'password',
//   name: 'Taylor',
//   lastName: 'Doe',
// };

/* Substitua o código das funções abaixo para que ela,
de fato, realize a busca no banco de dados */

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} Email Email do usuário a ser encontrado
 */
const findByEmail = async (Email) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('email = :email_param')
        .bind('email_param', Email)
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
};

/**
 * Busca um usuário através do seu ID
 * @param {string} Id ID do usuário
 */
const findById = async (Id) => {
  return connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'email', 'password', 'first_name', 'last_name'])
        .where('id = :id_param')
        .bind('id_param', Id)
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
};

// Faz o cadastro do usuário na tabela (users)
const addUser = async (email, passWord, firstName, lastName) => {
  await connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, passWord, firstName, lastName)
      .execute(),
  );
};

// Busca receita por usuário
const recipesId = async (userId) => {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idBind')
        .bind('idBind', userId)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, user_id, user, name, ingredients, instructions]) => ({
      id,
      user_id,
      user,
      name,
      ingredients,
      instructions,
    }));
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  recipesId,
};
