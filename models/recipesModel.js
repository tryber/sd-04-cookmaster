const connection = require('./connection');

const getRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
    .then((results) => results.fetchAll());

  return recipes.map(([recipeID, recipeName, userName]) => ({ recipeID, recipeName, userName }));
};

const getRecipeDetails = async (id) => {
  const recipeDetails = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['name', 'ingredients', 'instructions', 'user_id', 'user'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) => recipe[0]);

  const [name, ingredients, instructions, userID, user] = recipeDetails;
  return { name, ingredients, instructions, userID, user };
};

const createRecipe = async (userID, userName, recipeName, ingredients, instructions) => {
  await connection().then((db) =>
    db
      .getTable('recipes')
      .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
      .values(userID, userName, recipeName, ingredients, instructions)
      .execute(),
  );
};

module.exports = { getRecipes, getRecipeDetails, createRecipe };
