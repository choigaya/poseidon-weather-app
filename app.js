// 메인페이지,각종 날씨정보 페이지,오류를 처리 해주는 모듈

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

const weatherRoutes = require('./api/routes/weather');
const forecastRoutes = require('./api/routes/forecast');

app.use(express.static(path.join(__dirname, 'app/html'))); 

app.get('/', function(req, res) { // 메인 페이지
     res.sendFile(path.join(__dirname, 'app/html', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'app/html/error')));
 
app.get('/error/location', function(req, res) { // 위치 에러 페이지
     res.sendFile(path.join(__dirname, 'app/html/error', 'errorLocation.html'));
});
 
app.get('/error/place', function(req, res) { // 기상 정보 에러 페이지
     res.sendFile(path.join(__dirname, 'app/html/error', 'errorPlace.html'));
});

app.use(morgan('dev'));

app.use('/forecast', forecastRoutes);
app.use('/weather', weatherRoutes);

// ERROR Handling

app.use(function(req, res, next) {
     const error = new Error('Page Not Found');
     error.status(404);
     res.send('404 Page Not Found');
     next(error);
});

app.use(function(req, res, next) {
     const error = new Error('method Allowed');
     error.status(405);
     res.send('405 method Allowed');
     next(error);
});

app.use(function(req, res, next) {
     const error = new Error('Service Unavailable');
     error.status(503);
     res.send('503 Service Unavailable');
     next(error);
});

app.use(function(req, res, next) {
    const error = new Error('Unauthorized');
    error.status(401);
    res.send('401 Unauthorized');
    next(error);
});

app.use(function(error, req, res, next) {
    res.status(error.status || 500);    
    res.send('500 Internal Server Error');
});

module.exports = app;