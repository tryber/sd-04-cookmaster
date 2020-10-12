const connection = require('./connection');

const listCook = async () => (
  connection()
    .then((db) =>
      db
        .getTable('recipes')
        .select(['id', 'user', 'name'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((resul) => resul.map(([id, user, name]) => ({ id, user, name })))
);

module.exports = { listCook };
