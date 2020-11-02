const connection = require('./connection');

const findAllRecipes = () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((results) =>
      results.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const findRecipeById = (RecipeId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', RecipeId)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((result) =>
      result.map(([id, user_Id, user, name, ingredients, instructions]) => ({
        id,
        user_Id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = {
  findAllRecipes,
  findRecipeById,
};
