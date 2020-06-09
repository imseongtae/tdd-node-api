// Test 코드
const request = require('supertest');
// eslint-disable-next-line no-unused-vars
const should = require('should');
const app = require('./../../app');
const models = require('./../../models');

describe('GET /users', () => {
	// 모카에서는 프로미스를 리턴하면 비동기를 완료할 때까지 보장해줌
	before(() => models.sequelize.sync({ force: true }));
	const users = [{ name: 'alice' }, { name: 'bek' }, { name: 'chris' }];
	// limit 개수 응답 test를 위해
	before(() => models.User.bulkCreate(users));
	describe('성공시', () => {
		it('유저 객체를 담은 배열로 응답한다..!', done => {
			// supertest를 실행 인자로 app을 넣음
			request(app)
				.get('/users')
				.end((err, res) => {
					res.body.should.be.instanceOf(Array);
					done();
				});
		});

		it('최대 limit 개수만큼 응답한다.', done => {
			request(app)
				.get('/users?limit=2')
				.end((err, res) => {
					res.body.should.have.lengthOf(2);
					// res.body.should.be.instanceOf(Array);
					done();
				});
		});
	});
	describe('실패시', () => {
		it('limit이 숫자형이 아니면 400을 응답한다.', done => {
			request(app).get('/users?limit=two').expect(400).end(done);
		});
	});
});

describe('GET /users/:id', () => {
	before(() => models.sequelize.sync({ force: true }));
	const users = [{ name: 'alice' }, { name: 'bek' }, { name: 'chris' }];
	before(() => models.User.bulkCreate(users));
	describe('성공시', () => {
		it('id가 1인 유저 객체를 반환한다.', done => {
			request(app)
				.get('/users/1')
				.end((err, res) => {
					res.body.should.have.property('id', 1);
					done();
				});
		});
	});

	describe('실패시', () => {
		it('id가 숫자가 아닐 경우 400으로 응답한다', done => {
			request(app).get('/users/one').expect(400).end(done);
		});
		it('id로 유저를 찾을 수 없는 경우 404를 응답한다', done => {
			request(app).get('/users/999').expect(404).end(done);
		});
	});
});

describe('DELETE /users/:id', () => {
	before(() => models.sequelize.sync({ force: true }));
	const users = [{ name: 'alice' }, { name: 'bek' }, { name: 'chris' }];
	before(() => models.User.bulkCreate(users));
	describe('성공시', () => {
		it('204를 응답한다', done => {
			request(app).delete('/users/1').expect(204).end(done);
		});
	});

	describe('실패시', () => {
		it('id가 숫자가 아닐 경우 400으로 응답한다.', done => {
			request(app).delete('/users/one').expect(400).end(done);
		});
	});
});

describe('POST /users', () => {
	const users = [{ name: 'alice' }, { name: 'bek' }, { name: 'chris' }];
	before(() => models.sequelize.sync({ force: true }));
	before(() => models.User.bulkCreate(users));

	describe('성공시', () => {
		let name = 'daniel';
		let body;
		before(done => {
			request(app)
				.post('/users')
				.send({ name })
				.expect(201)
				.end((err, res) => {
					body = res.body;
					done();
				});
		});

		it('생성된 유저 객체를 반환한다.', () => {
			body.should.have.property('id');
		});
		it('입력한 name을 반환한다.', () => {
			body.should.have.property('name', name);
		});
	});

	describe('실패시', () => {
		it('name 파라미터 누락시 400을 반환한다.', done => {
			request(app).post('/users').send({}).expect(400).end(done);
		});
		it('name이 중복일 경우 409를 반환한다.', done => {
			request(app)
				.post('/users')
				.send({ name: 'daniel' })
				.expect(409)
				.end(done);
		});
	});
});

describe('PUT /users/:id', () => {
	before(() => models.sequelize.sync({ force: true }));
	const users = [{ name: 'alice' }, { name: 'bek' }, { name: 'chris' }];
	before(() => models.User.bulkCreate(users));

	describe('성공시', () => {
		it('변경된 name을 응답한다', done => {
			// POST 를 통해 추가한 daniel을 변경
			const name = 'chally';
			request(app)
				.put('/users/3')
				.send({ name })
				.end((err, res) => {
					res.body.should.have.property('name', name);
					done();
				});
		});
	});
	describe('실패시', () => {
		it('정수가 아닌 id일 경우 400응답', done => {
			request(app).put('/users/three').expect(400).end(done);
		});
		it('name이 없을 경우 400 응답', done => {
			request(app).put('/users/3').send({ name: '' }).expect(400).end(done);
		});
		it('없는 유저일 경우 404 응답', done => {
			request(app)
				.put('/users/987')
				.send({ name: 'coco' })
				.expect(404)
				.end(done);
		});
		it('이름이 중복일 경우 409 응답', done => {
			request(app).put('/users/3').send({ name: 'bek' }).expect(409).end(done);
		});
	});
});
