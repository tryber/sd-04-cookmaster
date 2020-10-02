require('dotenv/config');

module.exports = {
  "development": {
    "username": process.env.MYSQL_ROOT,
    "password": process.env.MYSQL_MlRl*1986#,
    "database": "cookmaster",
    "host": process.env.LOCALHOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQL_ROOT,
    "password": process.env.MYSQL_MlRl*1986#,
    "database": "cookmaster",
    "host": process.env.LOCALHOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MYSQL_ROOT,
    "password": process.env.MYSQL_MlRl*1986#,
    "database": "cookmaster",
    "host": process.env.LOCALHOST,
    "dialect": "mysql"
  }
};
