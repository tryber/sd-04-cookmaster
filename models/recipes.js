const connection = require('./connection');

const findAll = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['name', 'user', 'user_id', 'id']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([name, user, user_id, id]) => ({ name, user, user_id, id })));

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

module.exports = {
  findAll,
  findById,
};
