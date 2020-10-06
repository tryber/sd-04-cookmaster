const connection = require('./connection');

const showMyRecipes = async (userIdP) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select([])
    .where('user_id = :user_id')
    .bind('user_id', userIdP)
    .execute();

  const listing = await results.fetchAll();
  const list = await listing.map(([id, userId, user, name, ingredients, instructions]) => ({
    id,
    user_id: userId,
    user,
    name,
    ingredients,
    instructions,
  }));

  return list;
};

module.exports = { showMyRecipes };
