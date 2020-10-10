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
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :id')
      .bind('id', idRecipe)
      .execute();
    const [id, user, title, ingredients, instructions] = await resultSet.fetchOne();
    return {
      id,
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
  try {
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
    return;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByQuery,
  addNewRecipe,
};
