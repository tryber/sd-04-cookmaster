const conn = require('./connection');
const userModel = require('./userModel');

const getAllRecipes = async () => {
  const db = await conn();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute();

  const recipes = results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (id) => {
  const db = await conn();
  const results = await db
    .getTable('recipes')
    .select(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', id)
    .execute();

  const [userId, user, name, ingredients, instructions] = await results.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

const getRecipeByName = async (q) => {
  const db = await conn();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();

  const recipes = await results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const addRecipe = async (user, userId, name, ingredients, instructions) => {
  const db = await conn();
  return db
    .getTable('recipes')
    .insert(['user', 'user_id', 'name', 'ingredients', 'instructions'])
    .values(user, userId, name, ingredients, instructions)
    .execute();
};

const updateRecipe = async (id, name, ingredients, instructions) => {
  const db = await conn();
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

const getRecipeByUserId = async (userId) => {
  const db = await conn();

  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :userId')
    .bind('userId', userId)
    .execute();

  const recipes = await results.fetchAll();

  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const deleteRecipeById = async (recipeId) => {
  const db = await conn();
  return db
    .getTable('recipes')
    .delete()
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute();
}

const verifyUser = async (recipeId, userId, password) => {
  const recipe = await getRecipeById(recipeId);
  const recipeUser = await userModel.findById(recipe.userId);
  if (userId !== recipeUser.id || password !== recipeUser.password) {
    return false;
  }
  return true;
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  addRecipe,
  updateRecipe,
  getRecipeByUserId,
  deleteRecipeById,
  verifyUser,
};
