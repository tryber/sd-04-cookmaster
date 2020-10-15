const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    )
    .catch((err) => {
      throw err;
    });

const getRecipesId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['user_id', 'user', 'name'])
        .where('id = :idBind')
        .bind('idBind', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.forEach(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    )
    .catch((err) => {
      throw err;
    });
/**
 * Cadastro de receita
 * @param {*} userId
 * @param {*} user
 * @param {*} name
 * @param {*} ingredients
 * @param {*} instructions
 */
const addRecipes = async (userId, user, name, ingredients, instructions) => {
  await connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userId, user, name, ingredients, instructions)
      .execute(),
  );
};

module.exports = { getAllRecipes, addRecipes, getRecipesId };
