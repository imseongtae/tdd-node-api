const app = require('../app');
const syncDb = require('./sync-db');

syncDb().then(() => {
	console.log('database 동작 중');

	app.listen(3000, () => {
		console.log('application 동작 중');
	});
});
