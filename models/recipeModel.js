const connection = require('./connection');

const getAllRecipes = async () =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .execute()
      .then((results) => results.fetchAll())
      .then((results) =>
        results.map(([id, user, name, ingredients, instructions]) => ({
          id,
          user,
          name,
          ingredients,
          instructions,
        })),
      ),
  );

const getRecipeById = async (id) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select(['id', 'name'])
      .where('id = :id')
      .bind('id', id)
      .execute()
      .then((results) => results.fetchAll()[0])
      .then((recipes) => recipes.map((name) => name)),
  );

module.exports = { getAllRecipes, getRecipeById };
