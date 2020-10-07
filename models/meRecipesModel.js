const connection = require('./connection');

const meRecipesModel = (userId) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select()
        .where('user_id = :userId')
        .bind('userId', userId)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipesRes) => recipesRes)
    .catch((err) => err);

module.exports = meRecipesModel;
