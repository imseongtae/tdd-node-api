const express = require('express');
const morgan = require('morgan');

const app = express();

// api
const user = require('./api/user');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routing 설정
app.use('/users', user);

app.get('/', (req, res) => res.send('hello world~'));

// 포트 분리하기
// 바디파서 쓰지 말기

module.exports = app;
