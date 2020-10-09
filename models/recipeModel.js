const conn = require('./connection');

const getAllRecipes = async () =>
  conn
    .connection()
    .then((db) => db.getTable('recipes').select(['id', 'user_id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, userId, user, name]) => ({ id, userId, user, name })));

const getRecipeById = async (item) =>
  conn
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
        .where('id = :id')
        .bind('id', item)
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

const searchRecipe = async (recipe) =>
  conn
    .connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, user, name]) => ({ id, user, name })))
    .then((res) => res.find((food) => food.name === recipe));

const createRecipe = async (id, user, name, ingredients, instructions) => {
  conn
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
        .values(id, user, name, ingredients, instructions)
        .execute(),
    );
};

const updateRecipe = async (id, name, ingredients, instructions) =>
  conn
    .connection()
    .then((db) =>
      db
        .getTable('recipes')
        .update()
        .set('name', name)
        .set('ingredients', ingredients)
        .set('instructions', instructions)
        .where('id = :id_param')
        .bind('id_param', id)
        .execute(),
    );

const deleteRecipe = async (id) =>
  conn.connection().then((db) =>
    db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind(('id', id))
      .execute(),
  );

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
