// spec 이 붙으면 다 테스트 코드
const utils = require('./utils');
// eslint-disable-next-line no-unused-vars
const should = require('should');
// should();

// describe를 통해 테스트 환경 만들고
describe('utils.js 모듈의 capitalize() 함수는 ', () => {
	// it 함수를 통해 테스트 케이스를 만들 수 있음
	it('문자열의 첫 번째 문자를 대문자로 변환한다.', () => {
		// 테스트 코드를 작성하면 됨
		// 테스트 코드를 작성할 때는 검증 모듈이 필요
		// 이를 위해 assert 모듈을 사용
		const result = utils.capitalize('hello');
		// assert.equal(result, 'Hello');
		result.should.be.equal('Hello');
	});
});

// 모카가 코드를 돌려줌, 노드가 돌릴 수 없음
