const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select().execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const getRecipeById = async (recipeId) =>
  connection()
    .then((db) => db
      .getTable('recipes')
      .select()
      .where('id = :id')
      .bind('id', recipeId)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = {
  getAllRecipes,
  getRecipeById,
};
