// const mysql = require('mysql2');
const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

// let schema;
const connection = () =>
  // schema
  //   ? Promise.resolve(schema)
  //   :
  mysqlx
    .getSession(config)
    .then(async (session) => session.getSchema('cookmaster'))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

// const getAll = async () =>
//   con().then((db) =>
//     db
//       .getTable('recipes')
//       .select([user, name, ingredients, instructions])
//       .execute()
//       .then((results) => results.fetchAll())
//       .then((results) =>
//         results.map(([id, user, name, ingredients, instructions]) => ({
//           id,
//           user,
//           name,
//           ingredients,
//           instructions,
//         })),
//       ),
//   );

// const getRecipeById = async () =>
//   con().then((db) =>
//     db
//       .getTable('recipes')
//       .select([id, name])
//       .where('id = :id')
//       .bind('id', id)
//       .execute()
//       .then((results) => results.fetchAll())
//       .then((results) => results.fetchAll()[0])
//       .then((recipes) => recipes.map((name) => name)),
//   );

module.exports = { connection };
