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
      recipes.map(([id, userId, user, name]) => ({
        id,
        userId,
        user,
        name,
      })),
    );

const getByIdRecipe = (idd) =>
  connection()
    .then((bd) => bd.getTable('recipes').select([]).execute())
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
    )
    .then((recipes) => recipes.find((recipe) => recipe.id === idd));

module.exports = { getAllRecipes, getByIdRecipe };
