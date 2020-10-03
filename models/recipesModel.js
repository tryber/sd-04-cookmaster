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
        .select(['name', 'ingredients', 'instructions', 'user_id'])
        .where('id = :id')
        .bind('id', id)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((recipe) => recipe[0]);

  const [name, ingredients, instructions, userID] = recipeDetails;
  return { name, ingredients, instructions, userID };
};

module.exports = { getRecipes, getRecipeDetails };
