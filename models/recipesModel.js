const connection = require('./connection');

const getAllRecipes = async () => connection()
  .then((db) => db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .execute())
  .then((results) => results.fetchAll())
  .then((data) => data.map(([id, user, name]) => ({ id, user, name })))
  .catch((error) => error);

const getRecipeById = async (inputId) => connection()
  .then((db) => db
    .getTable('recipes')
    .select()
    .where('id = :id_param')
    .bind('id_param', inputId)
    .execute())
  .then((results) => results.fetchOne())
  .then(([id, userId, user, name, ingredients, instructions]) => ({
    id, userId, user, name, ingredients, instructions,
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
    id, userId, user, name, ingredients, instructions,
  })))
  .catch((error) => error);

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipeByName,
};
