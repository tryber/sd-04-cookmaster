const connection = require('./connection');

const findAllRecipes = async function () {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .execute(),
    )
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
};

const findRecipeById = async function (id) {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id_param')
        .bind('id_param', id)
        .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([recipeId, userId, user, name, ingredients, instructions]) => ({
      recipeId,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));
};

const searchRecipe = async function (name) {
  return connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('name like :name_param')
        .bind('name_param'.toLowerCase(), `%${name.toLowerCase()}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, recipeName, ingredients, instructions]) => ({
        id,
        userId,
        user,
        recipeName,
        ingredients,
        instructions,
      })),
    )
    .catch((err) => err);
};

const newRecipe = async (user_id, user, name, ingredients, instructions) => {
  return connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(user_id, user, name, ingredients, instructions)
      .execute(),
  );
};

module.exports = { findAllRecipes, findRecipeById, searchRecipe, newRecipe };
