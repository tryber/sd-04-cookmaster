const connection = require('./connection');
const userModel = require('./userModel');

const getAll = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const fetchList = await results.fetchAll();
  const list = await fetchList.map(([id, user, name]) => ({ id, user, name }));

  return list;
};

const getAllByUserId = async (userId) => {
  const db = await connection();

  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name', 'ingredients', 'instructions'])
    .where('user_id = :userId')
    .bind('userId', userId)
    .execute();

  const recipesList = await results.fetchAll();

  return recipesList.map(([id, user, name, ingredients, instructions]) => ({
    id,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const getById = async (recipeId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
  const fetchResult = await results.fetchOne();
  const [id, userId, user, name, ingredients, instructions] = fetchResult;
  return {
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  };
};

const getRecipeById = async (id) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [userId, user, name, ingredients, instructions] = await results.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

const getByName = async (recipeName) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${recipeName}%`)
    .execute();
  const fetchList = await results.fetchAll();
  const list = await fetchList.map(([id, user, name]) => ({ id, user, name }));
  return list;
};

const addRecipe = async (user, userId, name, ingredients, instructions) => {
  const db = await connection();
  return db
    .getTable('recipes')
    .insert(['user', 'user_id', 'name', 'ingredients', 'instructions'])
    .values(user, userId, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async (id, name, ingredients, instructions) => {
  const db = await connection();
  return db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', id)
    .execute();
};

const verifyUser = async (recipeId, userId, password) => {
  const recipe = await getRecipeById(recipeId);
  const recipeUser = await userModel.findById(recipe.userId);
  if (userId !== recipeUser.id || password !== recipeUser.password) {
    return false;
  }
  return true;
};

const deleteRecipeById = async (recipeId) => {
  const db = await connection();
  return db
    .getTable('recipes')
    .delete()
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute();
};

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  getRecipeById,
  getByName,
  addRecipe,
  updateRecipe,
  verifyUser,
  deleteRecipeById,
};
