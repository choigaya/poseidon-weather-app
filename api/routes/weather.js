const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors()); 

require('dotenv').config({path: __dirname + '/.env'});

// 요청을 대기함
// weather 는 사용자가 설정한 지역의 기상정보를 불러옴
router.get('/:place/info', function(req, res, next) {
    const position = req.params.place;
    const ADDRESS = `https://api.openweathermap.org/data/2.5/weather?id=524901${position}`+ 
                    `&mode=JSON&units=metric&appId=` + 
                    `${process.env.WEATHER_KEY}`;

       // 기상 정보의 API 를 불러옴
       request({
           headers: {'Content-Type': 'application/json'},
           url: ADDRESS,
           body: {},
           json: true,
           method: 'GET'
       },function(err, serverRes, body) {
           if (!err && serverRes.statusCode == 200) {  
              const info = body;

              res.send(info);      
           } else {
              res.send(body.message);          
           }
       });           
});

module.exports = router;