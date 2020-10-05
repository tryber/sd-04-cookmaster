const conn = require('./connection');

const getAllRecipes = async () =>
  conn
    .connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })));

const getRecipeById = async (id) =>
  conn
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([user, name, ingredients, instructions]) => ({
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const searchRecipe = async (recipe) =>
  conn
    .connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })))
    .then((res) => res.find((food) => food.name === recipe));

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipe,
};
