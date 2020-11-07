const connection = require('./connection');

const recipeDeleteModel = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .delete()
        .where('id = :id')
        .bind('id', id)
        .execute(),
    );

module.exports = recipeDeleteModel;
