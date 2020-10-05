const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['id', 'user', 'name']).execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, user, name]) => ({ id, user, name }));
  return list;
};

const getRecipeById = async (recipeId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }))[0];
  return list;
};

const searchRecipes = async (q) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'name', 'user'])
    .where('name like :name')
    .orderBy(['name'])
    .bind('name', `%${q}%`)
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, name, user]) => ({ id, name, user }));

  return list;
};

const newRecipe = async (userId, nameUser, name, ingredients, instructions) => {
  const db = await connection();
  await db
    .getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values([userId, nameUser, name, ingredients, instructions])
    .execute();
};

const editRecipe = async (recipeId, name, ingredients, instructions) => {
  const db = await connection();
  await db
    .getTable('recipes')
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  newRecipe,
  editRecipe,
};
