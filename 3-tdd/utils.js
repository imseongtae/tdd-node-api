function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// 모듈로 사용하기 위한 키워드
module.exports = {
	capitalize,
};
