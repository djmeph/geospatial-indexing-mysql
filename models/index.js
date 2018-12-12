const { DATABASE, USER, PASSWORD, HOST } = require('../config.json');
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const db        = {};
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  dialect: 'mysql',
  host: HOST,
  operatorsAliases: false,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  },
  logging: console.log
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  date = this._applyTimezone(date, options);
  return date.format('YYYY-MM-DD HH:mm:ss.SSS');
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
