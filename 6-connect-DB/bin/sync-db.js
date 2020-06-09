const models = require('../models');

module.exports = () => {
	// true는 기존 디비가 있더라도 디비를 다 날리고 새롭게 만든다는 의미
	const options = {
		force: process.env.NODE_ENV === 'test' ? true : false,
	};
	return models.sequelize.sync(options);
};
