const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll());

const getRecipeById = async (recipeId) =>
  connection()
    .then((db) => db.getTable('recipes').select([]).where('id = :id').bind('id', recipeId)
      .execute())
    .then((result) => result.fetchOne())
    .then(([id, userId, user, title, ingredientsString, instructions]) => {
      const ingredients = ingredientsString.split(',');
      return { id, userId, user, title, ingredients, instructions };
    });

const getRecipesByUserId = async (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('user_id = :user_id')
        .bind('user_id', userId)
        .execute(),
    )
    .then((result) => result.fetchAll());

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByUserId,
};
