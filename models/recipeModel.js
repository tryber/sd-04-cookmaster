const connection = require('./connection');

const getAllRecipes = async () =>
  // const db = await connection();
  // const results = await db
  //   .getTable('recipes')
  //   .select([])
  //   .execute();

  // const recipes = results.fetchAll();

  // return recipes.map(([id, user, name]) => ({
  //   id,
  //   user,
  //   name,
  //   }));
  connection()
    .then((db) => db.getTable('recipes').select([]).execute())
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, user_id, user, name]) => ({
        id,
        user_id,
        user,
        name,
      })),
    );

module.exports = { getAllRecipes };
