const connection = require('./connection');
const recipesModel = require('./recipesModel');
const userModel = require('./userModel');

module.exports = {
  ...connection,
  ...recipesModel,
  ...userModel,
};
