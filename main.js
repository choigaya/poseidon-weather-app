// 서버측 사이드 

const http = require('http');
const app = require('./app');

// 가져온 모듈을 웹서버로 연동
const server = http.createServer(app); 

// 헤로쿠 서비스를 사용해야되기 때문에 반드시 환경변수 로 포트를 불러온다.
// 헤로쿠 가 없다면 3000번 포트로 접속한다.
server.listen(process.env.PORT || 3000, function() {             
     console.log("Server: Success!");
});