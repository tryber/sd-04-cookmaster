const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
  const recipes = results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeById = async (idInput) => {
  const db = await connection();
  const result = await db
    .getTable('recipes')
    .select([])
    .where('id = :id')
    .bind('id', idInput)
    .execute();
  const [id, userId, user, name, ingredients, instructions] = await result.fetchOne();
  return { id, userId, user, name, ingredients, instructions };
};

const getRecipesByName = async (q) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :q')
    .bind('q', `%${q}%`)
    .execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, user, name]) => ({ id, user, name }));
};

const getRecipeByUserId = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('user_id = :userId')
    .bind('userId', userId)
    .execute();
  const recipes = await results.fetchAll();
  return recipes.map(([recipeId, user, name]) => ({ id: recipeId, user, name }));
};

const addRecipe = async (user, userId, name, ingredients, instructions) => {
  const db = await connection();
  return db
    .getTable('recipes')
    .insert(['user', 'user_id', 'name', 'ingredients', 'instructions'])
    .values([user, userId, name, ingredients, instructions])
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

const deleteRecipeById = async (recipeId) => {
  const db = await conn();
  return db
    .getTable('recipes')
    .delete()
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
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

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByName,
  getRecipeByUserId,
  addRecipe,
  updateRecipe,
  deleteRecipeById,
  verifyUser,
};
