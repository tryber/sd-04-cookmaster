const connection = require('./connection');
const userModel = require('./userModel');

const getAll = async () => {
  await connection()
    .then((db) => db.getTable('recipes'))
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .execute();

  return fetchAll().map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const getById = async (rId) => {
  await connection()
    .then((db) => db.getTable('recipes'))
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', rId)
    .execute();

  return fetchAll().map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }))[0];
};

const getByName = async (q) => {
  await connection()
    .then((db) => db.getTable('recipes'))
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();

  return fetchAll().map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const getByUser = async (uId) => {
  await connection()
    .then((db) => db.getTable('recipes'))
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :id')
    .bind('id', uId)
    .execute();

  return fetchAll().map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const createRecipe = async (recipe) => {
  const { id, firstName, name, ingredients, instructions } = recipe;
  await connection()
    .then((db) => db.getTable('recipes'))
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, firstName, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async (recipe) => {
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
    await connection()
      .then((db) => db.getTable('recipes'))
      .delete()
      .where('id = :id')
      .bind('id', recId)
      .execute();
  } else {
    throw Error('Senha Incorreta.');
  }
};

module.exports = {
  getAll,
  getById,
  getByName,
  createRecipe,
  updateRecipe,
  getByUser,
  deleteRecipe,
};
