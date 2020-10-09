const connection = require('./connection');

const findUserOfRecipe = async (recipeId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id'])
    .where('id = :id')
    .bind('id', recipeId)
    .execute();
  const infoUser = await results.fetchAll();
  return infoUser.map(([id, userId]) => ({
    id,
    userId,
  }))[0];
};

const findById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('users')
    .select(['id', 'password'])
    .where('id = :id')
    .bind('id', userId)
    .execute();
  const infoUser = await results.fetchAll();
  return infoUser.map(([id, password]) => ({
    id,
    password,
  }))[0];
};

const deleteRecipe = async (recipeId) => {
  const db = await connection();
  await db
  .getTable('recipes')
  .delete()
  .where('id = :id')
  .bind('id', recipeId)
  .execute();
};

module.exports = {
  findById,
  deleteRecipe,
  findUserOfRecipe,
};
