const express = require('express');
const router = express.Router();

const ctrl = require('./user.ctrl');

// 라우팅 설정 로직
// 라우팅 http 메서드의 첫 번째 인자로 '/users'가 넘어갔더니 에러
router.get('/', ctrl.index);

router.get('/:id', ctrl.read);

router.delete('/:id', ctrl.destroy);

router.post('/', ctrl.create);

router.put('/:id', ctrl.update);

module.exports = router;
