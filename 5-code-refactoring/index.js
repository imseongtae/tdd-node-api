const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const user = require('./api/user');

if (process.env.NODE_ENV !== 'test') {
	// test 가 아닐 경우만 서버 로그를 찍도록
	app.use(morgan('dev'));
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// routing 설정
app.use('/users', user); // users로 들어오는 API 요청에 user모듈이 동작함

app.get('/', (req, res) => res.send('Hello World! \n'));

// 서버를 중복으로 구동하지 않는 게 중요하다.
// application 쪽에서는 서버를 구동하지 않는 게 중요하다.
// app.listen(port, () =>
// 	console.log(`Example app listening at http://localhost:${port}`),
// );

// 그렇지만 위의 구문을 삭제하면 서버를 구동하는 listen함수도 삭제되어
// npm start로 서버가 구동되지 않는다.

module.exports = app;
