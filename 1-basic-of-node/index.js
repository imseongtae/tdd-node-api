const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log(req.url);

	if (req.url === '/') {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hello, World! \n');
	} else if (req.url === '/users') {
		// get users라는 API 추가
		res.statusCode = 201;
		res.setHeader('Content-Type', 'text/plain');
		res.end('User list \n'); // end함수로 User list 문자열 응답
	} else {
		res.statusCode = 404;
		res.end('404 Not Found~! \n');
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
