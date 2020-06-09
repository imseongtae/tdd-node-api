const Sequelize = require('sequelize');
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './db.sqlite',
	logging: false, // console 과 연동 해제
});

const User = sequelize.define('User', {
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
});

module.exports = { Sequelize, sequelize, User };
