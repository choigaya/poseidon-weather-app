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

// 위젯을 사용하기 위해 지역 id값을 가져옴(사용자의 현재위치를 추적하여 참고)
router.get('/:place/info',function(req, res, next) {
     const position = req.params.place;
     const ADDRESS = `https://api.openweathermap.org/data/2.5/forecast?id=524901${position}`+ 
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
               res.status(body.cod).send(body.message);          
            }
        });          
});

module.exports = router;