const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name'])
      .execute())
    .then((results) => results.fetchAll())
    .then((recipe) => recipe.map(([id, user, name]) => ({ id, user, name })));

const findById = async (idInput) =>
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

const findByName = async (nameInput) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select([])
        .where('name =:nameInput')
        .bind('nameInput', nameInput)
        .execute(),
    )
    .then((result) => result.fetchOne())
    .then(([id, userId, user, name, ingredients, instructions]) => ({
      id,
      userId,
      user,
      name,
      ingredients,
      instructions,
    }));

module.exports = {
  findByName,
  findById,
  findAll,
};
