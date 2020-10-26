const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'user', 'name']).execute())
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

const findByUserID = async (idInput) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .where('user_id =:id')
        .bind('id', idInput)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) => recipe.map(([id, user, name]) => ({ id, user, name })));

const createRecipe = async ({ user_id, user, nome, ingredients, instructions }) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(user_id, user, nome, ingredients, instructions)
      .execute(),
  );

const updateRecipe = async ({ id, nome, ingredients, instructions }) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', nome)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id =:id')
      .bind('id', id)
      .execute(),
  );

const removeRecipe = (idInput) =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = :id').bind('id', idInput)
    .execute(),
  );


module.exports = {
  findByUserID,
  updateRecipe,
  createRecipe,
  findByName,
  findById,
  findAll,
  removeRecipe,
};
