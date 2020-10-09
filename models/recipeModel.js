const connection = require('./connection'); // importar arquivo conexao

const findAllRecipes = async () => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const results = await table.select([]).execute();
  const recipes = await results.fetchAll();
  return recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const findRecipeById = async (recipeId) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.select([]).where('id = :id').bind('id', recipeId).execute();
  const [id, userId, user, title, ingredientsArray, instructions] = await result.fetchOne();
  const ingredients = ingredientsArray.split(',');
  return {
    id, userId, user, title, ingredients, instructions,
  };
};

const searchRecipeByName = async (q) => {
  const db = await connection();
  const allTable = await db.getTable('recipes')
    .select(['id', 'user_id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${q}%`)
    .execute();

  const results = allTable.fetchAll();
  const recipes = results.map(([id, userId, user, name]) => ({ id, userId, user, name }));
  return recipes;
};

const addRecipe = async ({ id, name, lastName }, { recipeName, ingredients, instructions }) => {
  const db = await connection();
  await db.getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, `${name} ${lastName}`, recipeName, ingredients, instructions)
    .execute();
};

const updateRecipe = async (Id, recipeName, ingredients, instructions) => {
  const db = await connection();
  await db.getTable('recipes')
    .update()
    .set('name', recipeName)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :id')
    .bind('id', Id)
    .execute();
};

module.exports = {
  findAllRecipes,
  findRecipeById,
  searchRecipeByName,
  addRecipe,
  updateRecipe,
};
