const connection = require('./connection');

const getAllRecipes = async () =>
  connection()
    .then((db) =>
      db.getTable('recipes').select().execute()
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
        id,
        userId,
        user,
        name,
        ingredients,
        instructions
      }))
    )

module.exports = {
  getAllRecipes,
};
