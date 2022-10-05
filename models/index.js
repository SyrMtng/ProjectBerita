const { Sequelize, DataTypes } = require('sequelize');

// sql server
const sequelize = new Sequelize('NodeDB', 'Andi', '12345', {
	dialect: 'mssql',
	//host: "192.168.xx",
	dialectOptions: {
	  // Observe the need for this nested `options` field for MSSQL
	  options: {
		// Your tedious options here
		useUTC: false,
		dateFirst: 1,
	  },
	},
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.berita = require('./berita')(sequelize, Sequelize);
db.komen1s = require('./komen1')(sequelize, Sequelize);
db.komen2s = require('./komen2')(sequelize, Sequelize);
module.exports = db;