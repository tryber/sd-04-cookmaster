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

const nRecipe = async (items, user) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(
        user.id,
        user.name,
        items.name,
        items.secret,
        items.setting,
      )
      .execute(),
  );

module.exports = {
  findAll,
  findById,
  findByName,
  nRecipe,
};
