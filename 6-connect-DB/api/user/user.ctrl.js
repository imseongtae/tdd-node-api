const models = require('./../../models');
// let users = [];

const index = async (req, res) => {
	req.query.limit = req.query.limit || 10;
	const limit = parseInt(req.query.limit, 10);
	if (Number.isNaN(limit)) {
		return res.status(400).end();
	}

	try {
		// limit 개수만큼 응답하기 위해 인자로 limit 전달
		const users = await models.User.findAll({ limit });
		res.json(users);
	} catch (error) {
		console.error(error);
	}
};

const read = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id)) return res.status(400).end();

	try {
		const user = await models.User.findOne({ where: { id } });
		if (!user) return res.status(404).end();
		res.json(user);
	} catch (error) {
		console.error(error);
	}
};

const destroy = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id)) return res.status(400).end();

	try {
		await models.User.destroy({ where: { id } });
		res.status(204).send({ results: true });
	} catch (error) {
		console.error(error);
	}
};

const create = (req, res) => {
	const name = req.body.name;
	if (!name) return res.status(400).end();

	models.User.create({ name })
		.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			// console.log(err.message); 에러 메시지 어떻게 출력하지...
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(409).end();
			}
			if (err) {
				res.status(500).send(JSON.stringify({ results: false }));
			}
		});
};

const update = async (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id)) res.status(400).end();
	const name = req.body.name;
	if (!name) return res.status(400).end();

	try {
		const user = await models.User.findOne({ where: { id } });
		if (!user) return res.status(404).end();

		user.name = name;
		await user.save();
		// console.log('변경된 name', user);
		res.json(user);
	} catch (err) {
		// console.log(err); // 에러메시지 뿜는 부분..
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).end();
		}
		res.status(500).end();
	}
};

module.exports = {
	index,
	read,
	destroy,
	create,
	update,
};
