const connection = require('./connection');

const insertRecipe = async (userId, userName, nameRecipe, item, modoPreparo) => {
  const db = await connection();
  await db
    .getTable('recipes')
    .insert(['user_id', 'user', 'name', 'ingredients', 'instructions'])
    .values([userId, userName, nameRecipe, item, modoPreparo])
    .execute();
};

module.exports = {
  insertRecipe,
};
