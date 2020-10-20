const connection = require('./connection');

const fetchAllRecipesModel = () =>
  connection()
    .then((db) => db.getTable('recipes').select([]).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions,
      })),
    );

const fetchRecipeIdModel = () => connection.then((db) => db.getTable('recipes')).execute;

const updateRecipeModel = () => connection.then((db) => db.getTable('recipes')).execute;

const insertRecipeIdModel = () => connection.then((db) => db.getTable('recipes')).execute;

const deleteRecipeIdModel = async () =>
  connection().then((db) =>
    db.getTable('recipes').delete().where('id = param_id').bind('param_id')
    .execute(),
  );

module.exports = {
  fetchAllRecipesModel,
  fetchRecipeIdModel,
  updateRecipeModel,
  insertRecipeIdModel,
  deleteRecipeIdModel,
};
