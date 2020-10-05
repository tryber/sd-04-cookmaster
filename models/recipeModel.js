const connection = require('./connection');

const getRecipes = async () =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipeData) =>
      recipeData.map(([id, user, name, ingredients, instructions]) => ({
        id,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const find = async (idUser) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', idUser)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipesById) =>
      recipesById.reduce(({ id, name, ingredients, instructions }) => ({
        id,
        name,
        ingredients,
        instructions,
      })),
    );

module.exports = {
  getRecipes,
  find,
};
