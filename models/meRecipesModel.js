const connection = require('./connection');

const findById = async (userId) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user_id', 'user', 'name'])
    .where('user_id = :user_id')
    .bind('user_id', userId)
    .execute();
  const infoRecipes = await results.fetchAll();
  return infoRecipes.map(([id, userid, user, name]) => ({
    id,
    userid,
    user,
    name,
  }));
};

module.exports = {
  findById,
};
