const app = require('./index');
const request = require('supertest');

describe('GET /users는', () => {
	// 2번째 파라미터로는 함수
	// done이라는 콜백함수로 비동기 대응
	it('...', done => {
		// supertest를 실행 인자로 app을 넣음
		request(app)
			.get('/users')
			.end((err, res) => {
				// end 함수의 콜백함수에서 결과 확인
				console.log(res.body);
				// 비동기에 대한 처리를 진행해야 함
				done();
			});
	});
});
