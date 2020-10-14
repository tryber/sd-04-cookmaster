const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const results = await db.getTable('recipes').select(['user', 'name']).execute();
  const fetchList = await results.fetchAll();
  const list = await fetchList.map(([user, name]) => ({ user, name }));

  return list;
};
module.exports = { getAll };
