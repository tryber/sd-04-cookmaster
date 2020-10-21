const connection = require('./connection');
const userModel = require('./userModel');

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
    )
    .catch((err) => err);
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

const newRecipe = async function (recipe) {
  const { id, firstName, name, ingredients, instructions } = recipe;
  await connection()
    .then((db) => db.getTable('recipes'))
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, firstName, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async function (recipe) {
  const { id, name, ingredients, instructions } = recipe;
  await connection()
    .then((db) => db.getTable('recipes'))
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

const deleteRecipe = async (uId, recId, password) => {
  const user = await userModel.findById(uId);
  const uPassword = user.password;

  if (password === uPassword) {
    const table = await connection().then((db) => db.getTable('recipes'));

    table.delete().where('id = :id').bind('id', recId).execute();
  } else {
    throw Error('Senha Incorreta.');
  }
};

const getByUser = async (uId) => {
  const table = await connection().then((db) => db.getTable('recipes'));
  const registers = await table
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :id')
    .bind('id', uId)
    .execute();

  return registers.fetchAll().map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  searchRecipe,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  getByUser,
};
