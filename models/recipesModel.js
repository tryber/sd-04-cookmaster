const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['name', 'user', 'id']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, id]) => ({ name, user, id })));

const findById = async (id) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select()
      .where('id = :idBind')
      .bind('idBind', id)
      .execute()
      .then((result) => result.fetchOne())
      .then((recipe) => recipe),
  );

const findByName = async (name) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select()
      .where('name like :nameBind')
      .bind('nameBind', `%${name}%`)
      .execute()
      .then((result) => result.fetchAll())
      .then((recipes) => recipes),
  );

const nRecipe = async (items) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(items.userId, items.user, items.name, items.secret, items.setting)
      .execute(),
  );

const editRecipe = async (id, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', name)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :idBind')
      .bind('idBind', id)
      .execute(),
  );

const deleteRecipe = async (id) =>
  connection().then((db) =>
    db
    .getTable('recipes')
    .delete()
    .where('id = :idBind')
    .bind('idBind', id)
    .execute(),
  );

const findByUserId = async (id) =>
connection().then((db) =>
  db
    .getTable('recipes')
    .select()
    .where('user_id = :idBind')
    .bind('idBind', id)
    .execute()
    .then((result) => result.fetchAll()),
  );

module.exports = {
  findAll,
  findById,
  findByName,
  nRecipe,
  editRecipe,
  deleteRecipe,
  findByUserId,
};
