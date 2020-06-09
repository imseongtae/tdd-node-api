
# 학습내용
- 폴더를 구조적으로 구분
- 스크립트의 역할 구분
- 테스트 환경을 별도로 설정하여 NODE_ENV 에 추가

## package.json
`package.json`의 test 스크립트 내용을 수정

```json
"test": "node_modules/.bin/mocha api/user/user.spec.js",
```


## test와 start 스크립트의 역할을 명확히 구분
test와 start 스크립트의 역할 구분을 통해 서버를 중복으로 구동하지 않는 게 중요하다.
application 쪽에서는 서버를 구동하지 않는 게 중요하므로 이를 위해 어플리케이션의 listen 함수를 삭제한다. 


```js
app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`),
);
```

그렇지만 위의 구문을 삭제하면 서버를 구동하는 listen함수도 삭제되어
npm start로 서버가 구동되지 않는다.
