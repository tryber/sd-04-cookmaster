const connection = require('./connection');

const getRecipes = async () =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .select([])
      .execute()
      .then((res) => res.fetchAll())
      .then((result) =>
        result.map(([id, userID, user, name, ingredients, instructions]) => ({
          id,
          userID,
          user,
          name,
          ingredients,
          instructions,
        })),
      )
  )
  .catch((err) => {
    throw err
  });

module.exports = { getRecipes };
