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
      result.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const findSearchRecipes = (q) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('name like :name')
        .bind('name', `%${q}%`)
        .execute(),
    )
    .then((result) => result.fetchAll())
    .then((result) =>
      result.map(([id, user, name]) => ({
        id,
        user,
        name,
      })),
    );

const createRecipe = ({ user_id, user, name, ingredients, instructions }) => {
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert('user_id', 'user', 'name', 'ingredients', 'instructions')
      .values(user_id, user, name, ingredients, instructions)
      .execute(),
  );
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  findSearchRecipes,
  createRecipe,
};
