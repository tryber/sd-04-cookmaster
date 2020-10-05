const connection = require('./connection');

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const dbSelect = await db.getTable('recipes').select(['id', 'user', 'name']).execute();
    const results = await dbSelect.fetchAll();
    return results.map(([id, user, name]) => ({
      id,
      user,
      name,
    }));
  } catch (error) {
    return error;
  }
};

const recipeDetails = async (idInp) => {
  try {
    const db = await connection();
    const dbSelectId = await db
      .getTable('recipes')
      .select(['id', 'user', 'name', 'ingredients', 'instructions'])
      .where('id = :idInp')
      .bind('idInp', idInp)
      .execute();
    const [id, user, name, ingredients, instructions] = await dbSelectId.fetchOne();
    return {
      id,
      user,
      name,
      ingredients,
      instructions,
    };
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRecipes,
  recipeDetails,
};
