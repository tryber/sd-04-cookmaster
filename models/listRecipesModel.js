const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const allTable = await db.getTable("recipes").select(["user", 'name']).execute();
  const results = allTable.fetchAll();
  return results.map(([user, name]) => ({user, name}))
}

module.exports = {
  getAll,
}
