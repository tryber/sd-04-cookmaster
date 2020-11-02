const connection = require('./connection');

const add = async (userId, user, name, ingredients, instructions) => connection().then((db) => db
  .getTable('recipes')
  .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
  .values(userId, user, name, ingredients, instructions)
  .execute());

const del = async (recipeId) => connection().then((db) => db
  .getTable('recipes')
  .delete()
  .where('id = :recipeId')
  .bind('recipeId', recipeId)
  .execute());

const getAllRecipes = async () => connection()
  .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
  .then((results) => results.fetchAll())
  .then((data) => data.map(([id, user, name]) => ({ id, user, name })))
  .catch((error) => error);

const getRecipeById = async (inputId) => connection()
  .then((db) => db.getTable('recipes').select().where('id = :id_param').bind('id_param', inputId)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }))
  .catch((error) => error);

const getRecipeByName = async (inputName) => connection()
  .then((db) => db
    .getTable('recipes')
    .select()
    .where('name like :query')
    .bind('query', `%${inputName}%`)
    .execute())
  .then((results) => results.fetchAll())
  .then((data) => data.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  })))
  .catch((error) => error);

const getRecipeByUserId = async (inputId) => connection()
  .then((db) => db.getTable('recipes').select().where('user_id = :id_param').bind('id_param', inputId)
    .execute())
  .then((results) => results.fetchAll())
  .then((data) => data.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  })))
  .catch((error) => error);

const update = async (id, name, ingredients, instructions) => connection().then((db) => db
  .getTable('recipes')
  .update()
  .set('name', name)
  .set('ingredients', ingredients)
  .set('instructions', instructions)
  .where('id = :id')
  .bind('id', id)
  .execute());

module.exports = {
  add,
  del,
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
  getRecipeByUserId,
  update,
};
