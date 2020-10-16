const connection = require('./connection');

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

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  getRecipeById,
  getByName,
};
