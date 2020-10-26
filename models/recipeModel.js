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

const getRecipeByName = (qInput) =>
  connection()
    .then((bd) =>
      bd
        .getTable('recipes')
        .select([])
        .where('name like :q')
        .bind('q', `%${qInput}%`)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipes) =>
      recipes.map(([id, userId, user, name]) => ({
        id,
        userId,
        user,
        name,
      })),
    );

const createRecipe = async (id, user, name, ingredients, instructions) =>
  connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(id, user, name, ingredients, instructions)
      .execute(),
  );

module.exports = { getAllRecipes, getByIdRecipe, getRecipeByName, createRecipe };
