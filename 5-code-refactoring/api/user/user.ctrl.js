let users = [
	{ id: 1, name: 'alice' },
	{ id: 2, name: 'bek' },
	{ id: 3, name: 'chris' },
	{ id: 4, name: 'ham' },
];

// API 로직이 들어감
const index = (req, res) => {
	req.query.limit = req.query.limit || 10;
	const limit = parseInt(req.query.limit, 10); // "2"
	if (Number.isNaN(limit)) {
		return res.status(400).end();
	}
	res.json(users.slice(0, limit));
};

const read = function (req, res) {
	const id = parseInt(req.params.id, 10);
	// 아이디가 숫자가 아닐 경우 값이 NaN으로 넘어온다
	if (Number.isNaN(id)) return res.status(400).end();

	const user = users.filter(user => user.id === id)[0];
	if (!user) return res.status(404).end();
	res.json(user);
};

const destroy = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id)) return res.status(400).end();
	users = users.filter(user => user.id !== id);
	res.status(204).end();
};

const create = (req, res) => {
	const name = req.body.name;
	if (!name) return res.status(400).end();
	const isFlag = users.filter(user => user.name === name).length;
	if (isFlag) return res.status(409).end();
	const id = Date.now();
	const user = { id, name };
	users.push(user);
	res.status(201).json(user);
};

const update = (req, res) => {
	const id = parseInt(req.params.id, 10);
	if (Number.isNaN(id)) return res.status(400).end();
	const name = req.body.name;
	if (!name) return res.status(400).end();
	const user = users.filter(user => user.id === id)[0];
	if (!user) return res.status(404).end();

	const duplicateName = users.filter(user => user.name === name).length;
	// const duplicateName = users.filter(user => user.name === name)[0];
	// 객체를 넘기는 것보다 숫자를 넘기는 게 나은가?
	if (duplicateName) return res.status(409).end();

	// POST에서 집어넣은 객체는 id값이 timestamp를 찍어놓아서 접근하지 못함
	user.name = name;
	console.log('변경된 name', user);
	res.json(user);
};

module.exports = {
	index,
	read,
	destroy,
	create,
	update,
};
