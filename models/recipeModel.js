const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name'])
    .execute())
    .then((results) => results.fetchAll())
    .then((recipe) => recipe.map(([id, user, name]) => ({ id, user, name })));

const findOne = async (idInput) =>
  connection()
    .then((db) =>
      db.getTable('recipes').select([]).where('id =:idInput').bind('idInput', idInput)
      .execute(),
    )
    .then((results) => results.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = {
  findOne,
  findAll,
};
