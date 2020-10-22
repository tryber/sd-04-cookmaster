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
/**
 * Cadastro de usuário
 * @param {*} email
 * @param {*} passWord
 * @param {*} firstName
 * @param {*} lastName
 */
const addUser = async (email, passWord, firstName, lastName) => {
  await connection().then((db) =>
    db
      .getTable('users')
      .insert(['email', 'password', 'first_name', 'last_name'])
      .values(email, passWord, firstName, lastName)
      .execute(),
  );
};

/**
 * Busca uma receita do usuário pelo Id
 * @param {*} idUser
 * @return {*}
 */
const getRecipesId = async (idUser) => {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :idBind')
        .bind('idBind', idUser)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));
};

/**
 * Busca todas as receitas do usuário pelo Id
 * @param {*} idUser
 * @return {*}
 */
const getAllRecipesId = async (idUser) => {
  const db = await connection();
  const consult = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :idBind')
    .bind('idBind', idUser)
    .execute();

  const result = await consult.fetchAll();

  // const [id, userId, user, name, ingredients, instructions] = result;
  return result.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

// Atualiza usuário
const updateUser = async (id, email, firstName, lastName, password) => {
  try {
    // console.log(id, email, firstName, lastName, password);
    const db = await connection();
    const update = await db
      .getTable('users')
      .update()
      .set('email', email)
      .set('first_name', firstName)
      .set('last_name', lastName)
      .set('password', password)
      .where('id = :id')
      .bind('id', id)
      .execute();
    return update.getAffectedItemsCount();
  } catch (error) {
    return null;
  }
};

module.exports = {
  findByEmail,
  findById,
  addUser,
  getRecipesId,
  getAllRecipesId,
  updateUser,
};
