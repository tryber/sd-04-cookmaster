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

const getRecipesByUserId = async (userID) => {
  const userRecipes = await connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'name', 'user'])
        .where('user_id = :userID')
        .bind('userID', userID)
        .execute(),
    )
    .then((results) => results.fetchAll());

  return userRecipes.map(([recipeID, recipeName, userName]) => ({
    recipeID,
    recipeName,
    userName,
  }));
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

const editRecipe = async (recipeID, recipeName, ingredients, instructions) => {
  await connection().then((db) =>
    db
      .getTable('recipes')
      .update()
      .set('name', recipeName)
      .set('ingredients', ingredients)
      .set('instructions', instructions)
      .where('id = :recipeID')
      .bind('recipeID', recipeID)
      .execute(),
  );
};

const removeRecipe = async (id) => {
  await connection().then((db) =>
    db
      .getTable('recipes')
      .delete()
      .where('id = :id')
      .bind('id', id)
      .execute(),
  );
};

module.exports = {
  getRecipes,
  getRecipeDetails,
  getRecipesByUserId,
  createRecipe,
  editRecipe,
  removeRecipe,
};
