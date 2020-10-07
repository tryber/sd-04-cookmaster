const connection = require('./connection');

const findByInput = async (searchInput) => {
  const db = await connection();
  const results = await db
    .getTable('recipes')
    .select(['id', 'user', 'name'])
    .where('name like :name')
    .bind('name', `%${searchInput}%`)
    .execute();
  const searchRecipe = await results.fetchAll();
  return searchRecipe.map(([id, user, name]) => ({
    id,
    user,
    name,
  }));
};

module.exports = {
  findByInput,
};
