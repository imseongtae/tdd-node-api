const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const users = [
	{ id: 1, name: 'alice' },
	{ id: 2, name: 'bek' },
	{ id: 3, name: 'chris' },
	{ id: 4, name: 'ham' },
];

app.use(morgan('dev'));

app.get('/', (req, res) => res.send('Hello World! \n'));
app.get('/users', (req, res) => {
	res.statusCode = 200;
	res.json(users);
});

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`),
);

module.exports = app;
