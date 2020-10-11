const connection = require('./connection');

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const resultSet = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const data = await resultSet.fetchAll();
    return data.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error.message;
  }
};

const getRecipeById = async (idRecipe) => {
  try {
    const db = await connection();
    const resultSet = await db.getTable('recipes')
      .select(['id', 'user_id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', idRecipe)
      .execute();
    const [id, userId, user, title, ingredients, instructions] = await resultSet.fetchOne();
    return {
      id,
      userId,
      user,
      title,
      ingredients,
      instructions,
    };
  } catch (error) {
    return error.message;
  }
};

const getRecipesByQuery = async (query) => {
  try {
    const db = await connection();
    const resultSet = await db.getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('name like :name')
      .bind('name', `%${query}%`)
      .execute();
    const recipes = await resultSet.fetchAll();
    return recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error.message;
  }
};

const addNewRecipe = async ({ recipeName, ingredientes, prepareMode }, userInfo) => {
  const { id, name, lastName } = userInfo;
  const ingredientesJoined = ingredientes.join(',');

  const db = await connection();
  const tableReference = await db.getTable('recipes');
  tableReference.insert([
    'user_id',
    'user',
    'name',
    'ingredients',
    'instructions',
  ])
  .values(
    id,
    `${name} ${lastName}`,
    recipeName,
    ingredientesJoined,
    prepareMode,
  ).execute(); // 'Receita Cadastrada com Sucesso!';
};

const updateRecipe = async (recipeId, { recipeName, ingredientes, prepareMode }) => {
  const ingredientesJoined = ingredientes.join(',');

  const db = await connection();
  await db.getTable('recipes')
    .update()
    .set('name', recipeName)
    .set('ingredients', ingredientesJoined)
    .set('instructions', prepareMode)
    .where('id = :recipeId')
    .bind('recipeId', recipeId)
    .execute(); // 'Receita atualizada com Sucesso!';
};

const getRecipesByUserId = async (userId) => {
  try {
    const db = await connection();
    const resultSet = await db.getTable('recipes')
      .select(['id', 'user', 'name'])
      .where('user_id = :id')
      .bind('id', userId)
      .execute();
    const recipes = await resultSet.fetchAll();
    return recipes.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByQuery,
  addNewRecipe,
  updateRecipe,
  getRecipesByUserId
};
