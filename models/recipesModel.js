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
    console.log(error);
    return error;
  }
};

module.exports = { getAllRecipes };
