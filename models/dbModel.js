const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();

const connection = () => {
  return mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
    })
    .then((session) => {
      schema = session.getSchema('cookmaster');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

const getAllRecipes = async () =>
  connection()
    .then((db) => db.getTable('recipes').select(['id', 'name', 'user']).execute())
    .then((results) => results.fetchAll())
    .then((recipes) => recipes.map(([id, name, user]) => ({ id, name, user })));

module.exports = {
  getAllRecipes,
};
