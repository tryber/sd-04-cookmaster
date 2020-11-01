const connection = require('./connection');

const fetchAllRecipesModel = () =>
  connection()
    .then((db) => db.getTable('recipes').select([]).execute())
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
    );

const fetchRecipeIdModel = async (idParam) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.select([]).where('id = :param_id').bind('param_id', idParam).execute();
  const recipe = result.fetchOne();
  const [id, userId, user, name, ingredients, instructions] = recipe;
  return { id, userId, user, name, ingredients, instructions };
};

const fetchRecipeNameModel = async (nameParam) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table
    .select([])
    .where('name like :param_name')
    .bind('param_name', `%${nameParam}%`)
    .execute();
  const recipes = result.fetchAll();
  return recipes.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    userId,
    user,
    name,
    ingredients,
    instructions,
  }));
};

const insertRecipeIdModel = async (id, user, name, ingredients, instructions) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values(id, user, name, ingredients, instructions)
    .execute();
  return result.getWarningsCount();
};

const updateRecipeModel = async (id, name, ingredients, instructions) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table
    .update()
    .set('name', name)
    .set('ingredients', ingredients)
    .set('instructions', instructions)
    .where('id = :param_id')
    .bind('param_id', id)
    .execute();
  return result.getWarningsCount();
};

const deleteRecipeIdModel = async (idParam) => {
  const db = await connection();
  const table = await db.getTable('recipes');
  const result = await table.delete().where('id = :param_id').bind('param_id', idParam).execute();
  return result.getWarningsCount();
};

module.exports = {
  fetchAllRecipesModel,
  fetchRecipeIdModel,
  fetchRecipeNameModel,
  updateRecipeModel,
  insertRecipeIdModel,
  deleteRecipeIdModel,
};
