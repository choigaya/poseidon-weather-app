# weather-app-Poseidon


# 소개

weather-app-Poseidon 은 기상 정보를 실시간으로 보여줄 수 있는 웹앱입니다. 클라이언트 측에는 CSS Grid로 제작, fetch API를 사용하여 서버에 요청하는
구조와 기능을 만들었고, 서버 측에는 Node JS express 미들웨어를 통해 크로스 도메인(CORS) 문제를 줄이고, 사용자의 API 키를 보안을 유지할 수 있는 기능을 구현하게 되었습니다. 호스팅 서버로는 heroku를 사용하게 되었습니다.


![image](https://user-images.githubusercontent.com/11676387/63869960-fe2b5780-c9f3-11e9-9768-ca50d0117822.png)

![image](https://user-images.githubusercontent.com/11676387/63870031-231fca80-c9f4-11e9-8ae9-a82f45c783ea.png)

![image](https://user-images.githubusercontent.com/11676387/63870097-4185c600-c9f4-11e9-949e-17b4a76fec6f.png)



# 기능

 - 사용자의 위치를 추적하여 일기 예보를 전달해 줍니다. (최초 1회만 가능, 추후 장소를 이동하게 되면 변경한 지역의 예보만 볼 수 있음)

 - 사용자가 지도위에 마커를 클릭하면, 해당 지역의 기상 정보를 실시간으로 파악 할 수 있습니다. (클릭 시 실시간으로 정보를 갱신하여 보여줌)

 - 기상 정보를 차트로 시각적으로 편리하게 볼 수 있습니다. (최초 1회만 가능, 추후 장소를 이동하게 되면 변경한 지역의 예보만 볼 수 있음)


# 개발 언어 / 프레임 워크

 - HTML5, CSS3, JS(ES 15+), Node JS, Express

 - Open Weather Map, Map Box, High Charts, Heroku


# 플랫폼


 - google chrome 50+ (반드시 크롬을 사용하셔야 합니다. 50버전 이하 버전에서 는 위젯, 차트 기능을 사용하실 수 없습니다)

 - 위치 기능을 반드시 허용해주세요. 허용하지 않을 시 앱을 사용하지 못합니다.



# REST API


 - 실시간 날씨

 ![image](https://user-images.githubusercontent.com/11676387/64058884-b4f22800-cbec-11e9-9c59-744b470e72c6.png)


 HTTP GET /weather/&lat=위도&lon=경도/info를 하시게 되면 GET 방식으로 서버에게 요청하여 실시간 기상 정보를 JSON 형태로 보실 수 있습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64058899-d5ba7d80-cbec-11e9-96fa-ce4ce66eda8e.png)


 - 실시간 예보

 ![image](https://user-images.githubusercontent.com/11676387/64058855-6e9cc900-cbec-11e9-9ef7-943ecb1d0f6b.png)

 HTTP GET /forecast/&lat=위도&lon=경도/info를 하시게 되면 GET 방식으로 서버에게 요청하여 실시간 기상 예보를 JSON 형태로 보실 수 있습니다.

 ![image](https://user-images.githubusercontent.com/11676387/64059031-b02e7380-cbee-11e9-8544-77b1ece25be7.png)




# 과정 및 설명

기상 웹앱을 만든 목적은 더욱 정확한 기상 정보를 볼 수 있는 사이트를 만들고 싶어서였습니다. 기존에 만든 clean maps는 제가 웹을 처음 공부하면서 만들
었고, 단순히 클라이언트 위에 맵을 그려 넣어 API를 호출하는 웹앱이었는데 가장 큰 문제였던 SOP(Same-origin_policy) 문제가 항상 골칫거리였습니다.
이 문제를 해결하기 위해 웹서버를 구축하여 SOP 문제를 해결하고, 서버 측에서 API를 호출 한 뒤 자체적으로 필터링하는 방식을 채택하였습니다. 호출된 값은
클라이언트로 전송되게 됩니다. 지금부터 가장 큰 문제였던 크로스 도메인 문제와 API 키 보안 문제를 어떻게 해결하고, 프레임워크와 사이트의 레이아웃,
UI가 어떤 식으로 배치되었으며 제작되었는지 설명을 하겠습니다.

우선 클라이언트 사이드 측에 대한 설명을 하겠습니다.



# 클라이언트

- 레이아웃

 페이지의 위부터 아래까지 총 6개의 블록으로 나누게 되었습니다. (편하게 블록이라 표현하였습니다) CSS Grid를 사용하게 되면 요소들을 배치하기가 보다
 쉽고 편리해집니다. Grid로 전체적인 6개의 블록을 나눈 뒤 그 안에서 요소들을 배치하였습니다.


![0001](https://user-images.githubusercontent.com/11676387/64068021-16f27200-cc6d-11e9-831c-03308305838b.png)


![0002](https://user-images.githubusercontent.com/11676387/64068022-1954cc00-cc6d-11e9-8772-4778a94c481f.png)

![0003](https://user-images.githubusercontent.com/11676387/64068023-1b1e8f80-cc6d-11e9-9c92-385ac26fe500.png)



 위의 사진과 같이 1블록에는 header 부분 2블록에는 main 내용 이 들어오는 자리인데, 맵이 로드되는 부분입니다. 3블록에는 widget 이 들어오는 자
 리이고, 이 후 새롭게 도입된 open weather map widget이며 API 키를 기본적으로 공통된 키를 사용하고 있어서 보안성에 전혀 문제없이 사용 가능하다는 점
 이 장점입니다. 4블록에는 chart가 들어오는 자리입니다. high chart를 활용하여 강수량 정보와 풍향 정보를 시각적으로 편리하게 볼 수 있도록 배치하   였습니다. 5블록에는 footer 다 들어오는 자리입니다. 저작권 정보를 포함하고 있습니다. 6블록은 소셜네트워크 링크를 포함한 버튼 UI입니다.

 각각 그리드는 다음과 같이 나눠져 있습니다.

 블록은 1에서 8 사이의 범위를 정해 글꼴 크기에 맞게 배치되었고, 2블록/3블록/4블록은 width 크기를 기준으로 설정하였습니다. 따라서,
 UI의 크기에 비례하여(width: 100%, 각자 고유의 크기를 갖고 있습니다.) 레이아웃 안의 요소들이 배치되어 있고, 미디어 쿼리는 최소 300 PX(모바일) ~
 800 PX(데스크톱) 이며 반응형으로 제작되었습니다.


- UI / 폰트

 fontawsome을 사용하였고, 각종 SNS 사이트에 공유할 수 있도록 만들었습니다. 직접 공유할 수 있는 주소를 삽입하여 사용자가 언제든지 자신의 피드에 정보
 를 공유할 수 있도록 만들었습니다.


 다음은 실행순서에 따라 어떤 식으로 렌더링 되는지 그리고, 클라이언트와 서버와는 어떤 관계가 있는지 설명하겠습니다.


 - 맵 로드

 이 웹앱은 "map box" 사용하게 됩니다. 토큰을 통해 접근하여 클라이언트 측에 맵을 그려내는 작업을 합니다. main 블록에 배치 가 됩니다. 크기는 레이아
 웃에 맞춰 width 100%(레이아웃에 따라 크기가 바뀜), height 300 PX(고정)입니다. 맵을 로드하는 이벤트는 on('load') 이며 script에서 정의했던

 mapbox-gl-js 에서 불러오게 됩니다. 반드시 주의해야 할 점이 초기 마커의 위치는 위도, 경도를 **-90~90 , -180~180 사이** 에 값을 넣어야 합니다
 다. (참고: https://docs.mapbox.com/help/glossary/lat-lon/)


 1. 맵을 로드합니다. 위에서 언급 드렸듯이 -90~90 , -180~180 의 위치를 지정합니다. (캐나다 토론토)

 ![image](https://user-images.githubusercontent.com/11676387/64071668-d79e4280-ccb9-11e9-9c9e-0ed21862a94e.png)


 2. marker의 색상, 지도 위에 검색한 바를 추가하여 add Control 객체에 geoCorder 를 넘겨줍니다.

 ![image](https://user-images.githubusercontent.com/11676387/64071677-00bed300-ccba-11e9-996e-5426c58b3600.png)


 3. load가 끝나면 getLatLng() 함수를 호출합니다. 이 함수는 사용자의 위치를 추적하여 맵위에 해당 위치를 마커로 찍게 됩니다.
 아래 내용(기상 예보 정보 가져오기 설명에서 자세히 다루겠습니다.)

 ![image](https://user-images.githubusercontent.com/11676387/64071698-90fd1800-ccba-11e9-9d8b-a69d5747bb12.png)



 - 기상 예보 정보 가져오기

 클라이언트는 다음과 같이 사용자의 위치정보를 요청하게 됩니다. 위치 정보를 허용하지 않으시면 앱을 사용하실 수 없습니다. 반드시 크롬 설정에서 보안
 을 허용해주셔야합니다.(/app > html > latlon.js)


 ![image](https://user-images.githubusercontent.com/11676387/64067104-e951fc80-cc5d-11e9-832c-c5a21bdb4a48.png)


 위치정보가 파악되면 위도, 경도 값을 불러오게 됩니다.


 ![image](https://user-images.githubusercontent.com/11676387/64067143-a8a6b300-cc5e-11e9-9e5f-4e8d6f20a110.png)


 서버 측에 'GET' 방식으로 요청을 하게 되어있습니다. 서버 측 은 'GET' 방식으로 요청을 대기하게 됩니다. 추후 서버 설명에서 자세히 다루도록 하겠습니다.



 ![image](https://user-images.githubusercontent.com/11676387/64067280-34214380-cc61-11e9-833d-4fb66e4daf57.png)


 - weathermap-app.herokuapp.com/ -> | GET 요청(위도,경도) | ->  weathermap-app.herokuapp.com/forecast/&lat=위도&lon=경도/info
 - weathermap-app.herokuapp.com/ <- | JSON 방식으로 전달  | <- weathermap-app.herokuapp.com/forecast/&lat=위도&lon=경도/info


 일기 예보의 정보는 HTTP GET/forecast/&lat=위도&lon=경도/info로 접근 할 수 있습니다. (위 상단의 REST API를 참고해 주세요.)그리고, GET 방식의
 로 요청을 세팅한 뒤 "fetch api" 를 활용하게 됩니다. fetch api 의 Request 객체에 URL, Method를 전달 해준 뒤 웹 서버로 접근합니다. 이때 같은 도
 메인 상에 접근하므로 SOP를 회피할 필요가 없습니다. 이미 SOP가 성립되기 때문입니다.


 HTTP GET weathermap-app.herokuapp.com/   | 동일 정책 성립 |  HTTP GET weathermap-app.herokuapp.com/forecast/&lat=위도&lon=경도/info


 이제 이것을 "fetch api" 를 통해 서버로 요청해주는 작업을 하면 됩니다.

 ![image](https://user-images.githubusercontent.com/11676387/64067537-00e0b380-cc65-11e9-9547-8606b38bb220.png)

 반드시 json으로 정보를 받게 되어 있습니다. 서버 측에서 이미 json 형태로 변환해 주기 때문에 사실 클라이언트에서는 별도의 작업이 필요 없습니다.
 받은 정보를 토대로 반드시 처리해야 할 사항이 있습니다. "강수량" 에 대한 처리입니다. 이 웹앱은  "open weather map"을 사용하고 있습니다. 우선
 open weather map의 기상예보 정보를 확인해보겠습니다.


 - 강수량 정보 로직 구현하기(**반드시 처리 해줘야 할 사항입니다.)


 ![image](https://user-images.githubusercontent.com/11676387/64067634-dabc1300-cc66-11e9-9148-c1cac7df1523.png)



 ![image](https://user-images.githubusercontent.com/11676387/64067671-56b65b00-cc67-11e9-9099-5cfc81958116.png)


 클라이언트가 사용하게 될 정보는 날짜(dt_txt), 현재 온도(temp), 최저 온도(temp_min), 최고 온도(temp_max), 풍속(wind),**강수량(rain)** 입니다.
 위의 데이터에서 보시다시피 rain에 관련된 프로퍼티는 존재하지 않습니다. 하지만 다음과 같이 rain 프로퍼티가 생기는 경우 가 존재합니다. 자세한
 설명을 하겠습니다. rain 프로퍼티가 생기는 기준은 총 3가지 경우입니다.

 ![image](https://user-images.githubusercontent.com/11676387/64067783-0f30ce80-cc69-11e9-9925-4dd2793ac0c8.png)


 1) 특정 날짜와 시간대 를 포함 3시간 이내에 비가 올 경우

 -> 이때는 반드시 rain 프로퍼티 안에 3h가 존재합니다. 즉 특정 날짜, 시간 대 를 포함하여 3시간 이내의 강수량 데이터를 갱신합니다. 갱신한 내
 용은 3h 프로퍼티에 저장됩니다. (ex. {rain:{3h: 0.013}})


 2) 특정 날짜와 시간대 를 포함 3시간 이내에 비가 올 가능성은 있지만, 데이터 가 갱신되지 않을 경우(확정되지 않을 경우/예보가 취소될 경우)

 -> 3h 프로퍼티는 존재하지만, 아직 데이터가 확정되지 않을 경우 'undefined'로 처리하여 갱신됩니다. 30분 ~ 1시간 이내로 값을 갱신하게됩니
 다. 만약 1시간 이내로 갱신되지 않는다면 3h 프로퍼티는 제거 되고, rain 프로퍼티 또한 사라집니다. 다시 말해 비가 오지 않는다는 뜻입니다.
 즉, 비가 온다고 정보를 전달했지만, 취소되는 경우입니다.

 - ex. {rain:{3h: undefined}} -> | 1시간 이내로 정보 갱신 O | -> {rain:{3h: 0.013}} | 갱신 완료, 비가 옴 | -

 - ex. {rain:{3h: undefined}} -> | 1시간 이내로 정보 갱신 X | -> {} | 갱신 취소, 비가 온다는 예보 취소됨 | -


 3) 특정 날짜와 시간대에 비가 올 경우

 -> rain 프로퍼티만 생성 되고, rain에 값이 들어갑니다.

 (ex. {rain:0.013})



 4) 특정 날짜와 시간대 에 비가 올 가능성은 있지만 확정되지 않을 경우

 -> 이때는 rain 프로퍼티만 존재 합니다. 확정되지 않았기 때문에 undefined로 처리됩니다. 확정되면 값이 저장되고, 최종적으로 비가 온다는
 정보가 취소되면 rain 프로퍼티는 소멸합니다.


 이제 4가지 경우의 해결 법은 다음과 같습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64071496-61e4a780-ccb6-11e9-9791-a33fdfd077bb.png)


 만약 비가 오지 않을 경우에는 rain 프로퍼티 생성 후 0.00의 값을 넣어줍니다. 이렇게 된 정보를 widget, chart 함수에 각각 파라미터를 넘겨 줍니
 다. widget에는 지역의 고유 id 번호를, chart에는 풍향, 강수량 정보를 넘겨줍니다.

 이렇게 넘겨받은 함수들은 각자 네임스페이스 객체 안에 값을 설정합니다.


 ![image](https://user-images.githubusercontent.com/11676387/64071534-18488c80-ccb7-11e9-80da-b05685814da3.png)

 ![image](https://user-images.githubusercontent.com/11676387/64071544-4b8b1b80-ccb7-11e9-8a4f-8c8178e186fb.png)

 ![image](https://user-images.githubusercontent.com/11676387/64071560-b5a3c080-ccb7-11e9-9530-ac2a7c5e4c30.png)



 - 맵을 클릭 하였을 때

 맵 로드 가 끝난 뒤 사용자가 위치한 지역에 마커를 찍게 되면 다음과 같은 화면이 렌더링 됩니다.

 ![image](https://user-images.githubusercontent.com/11676387/64071824-8a23d480-ccbd-11e9-84a7-043302718f59.png)


 이제 저 맵위의 마커를 클릭할 때의 이벤트를 설명하겠습니다. 마커를 클릭할 때 해당 지역의 현재, 최고, 최저 온도, 시각화를 위한 아이콘이 출력되게
 됩니다.


 1. 마커를 클릭 시 해당 지역의 정보를 map box 가 추적하고,e 라는 객체 에 저장합니다. 객체안에는 위치 정보가 포함되어 있습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64071854-6a40e080-ccbe-11e9-9895-d577336392c1.png)


 2. 위치 정보를 가져올 수 있게 되고, 각자 의 변수에 대입합니다.

 ![image](https://user-images.githubusercontent.com/11676387/64071838-f43c7980-ccbd-11e9-8a05-6041c57e6a81.png)


 - 현재 기상 정보 가져오기

 3. 해당 지역의 실시간 기상 정보를 가져옵니다.**예보기능** 이 아닙니다!

 ![image](https://user-images.githubusercontent.com/11676387/64071898-9c067700-ccbf-11e9-9faa-1da18c57f9ee.png)


 일기 예보와 마찬가지로 GET 방식으로 요청하게 됩니다. HTTP GET /weather/&lat=위도&lon=경도/info로 요청한 뒤 fetch api를 이용하여 서버 측에
 전달, 서버는 응답 후 json 형태로 값을 넘겨줍니다. (위의 기상 예보 설명과 동일합니다. 일부 생략하도록 하겠습니다.)

 ![image](https://user-images.githubusercontent.com/11676387/64071960-fe13ac00-ccc0-11e9-9a2d-094b954fcb19.png)


 4. 팝업에 들어갈 내용을 저장해 줍니다.

 ![image](https://user-images.githubusercontent.com/11676387/64071989-81350200-ccc1-11e9-9eaa-7f2e3dd69a12.png)


 5. 팝업을 디자인합니다.

 ![image](https://user-images.githubusercontent.com/11676387/64071992-9e69d080-ccc1-11e9-912c-f0b5c4ccc44b.png)


 이제 맵위의 해당 지역 마커를 클릭하게 되면, 다음과 같이 렌더링 됩니다.

 ![image](https://user-images.githubusercontent.com/11676387/64072010-0a4c3900-ccc2-11e9-8374-1f17b8eed2f0.png)


 # 서버

 서버 측은 다음과 같은 구조로 되어 있습니다. api 폴더는 라우팅을 관리, app 는 클라이언트 측 관리,/app. js 는 api 의 내용을 라우팅,/main.js 는 웹
 서버 입니다.


 ![image](https://user-images.githubusercontent.com/11676387/64072818-2fe03f00-ccd0-11e9-9421-27b3e731dc8f.png)


 ![image](https://user-images.githubusercontent.com/11676387/64072827-4e463a80-ccd0-11e9-86ae-74072eeb56f1.png)


 ![image](https://user-images.githubusercontent.com/11676387/64072833-69b14580-ccd0-11e9-8527-96eb725c5c9d.png)


 총 4가지에 대해 말씀드리겠습니다.

 1. 라우팅 2. 메인 페이지 처리 3. 클라이언트 에러 페이지 처리 4. 서버 에러 처리


 - 라우팅

 - /app.js

 1. 사용할 모듈을 불러옵니다.

 ![image](https://user-images.githubusercontent.com/11676387/64072722-b4ca5900-ccce-11e9-91b0-c62f93d0eea9.png)


 2. 라우팅하기 위해 라우터들을 불러옵니다.

 ![image](https://user-images.githubusercontent.com/11676387/64072733-ed6a3280-ccce-11e9-825e-d9ec3dfeec57.png)


 3. app.js 는 라우팅을 하기 위한 서버라고 말씀드렸었는데 관계성을 좀 더 설명해드리겠습니다. 우선 weather. js, forecast. js 부분을 보시게
 되면, router 로 get 방식으로 요청을 대기하고 있습니다.


 - weather. js

 앞서 설명해 드린 것 과같이 이 웹앱은 기본적으로 'GET' 방식으로 응답에 대기합니다. (클라이언트가 요청하는 과정은 클라이언트 부분을 참고해주세요)
 클라이언트에게 받아온 파라미터 값을 position 변수 안에 저장한뒤(위도 경도 값입니다.&lat='위도'&lon='경도')해당 API 주소에 전달해줍니다. 또
 한, env 환경변수를 설정하여 외부에 노출되지 않도록 API 키를 보안 하였습니다.

 ![image](https://user-images.githubusercontent.com/11676387/64072851-af6e0e00-ccd0-11e9-8976-5622fdb64cb3.png)


 해당 라우터는 request 객체를 통해 'GET'으로 API 서버에 실시간 기상 정보를 요청합니다. 이때 크로스도 메인 이슈(CORS) 문제를 방지하고자 다음
 과 같은 미들웨어를 사용했습니다.

 ![image](https://user-images.githubusercontent.com/11676387/64072988-d9283480-ccd2-11e9-96c2-cfc93c8e5b09.png)


 ![image](https://user-images.githubusercontent.com/11676387/64072940-3cfe2d80-ccd2-11e9-8489-aba4751fd230.png)

 서버 측에는 JSON 형태의 데이터를 렌더링합니다. (REST API로 접근하시면 더 쉽게 접근 하실 수 있습니다.)


 ![image](https://user-images.githubusercontent.com/11676387/64073054-cd893d80-ccd3-11e9-8e06-ee3607d879d2.png)



 ![image](https://user-images.githubusercontent.com/11676387/64073277-75a00600-ccd6-11e9-9061-ab790c1e865e.png)




 - forecast.js

 마찬가지로 위와 동일한 내용입니다.다만, 주소 값을 다르게 입력해야 됩니다. https://api.openweathermap.org/data/2.5/weather? 도메인 부분이
 weather로 끝나면, 현재 위치의 날씨이고, https://api.openweathermap.org/data/2.5/forecast? forecast로 끝나게 된다면, 기상 예보입니다.



 - 메인 페이지 처리


 메인페이지는 express 미들웨어를 사용하였습니다. 정적 파일을 가져온 뒤 웹서버에 적용했습니다. 그 외에는 별다른 경우가 없습니다.

 ![image](https://user-images.githubusercontent.com/11676387/64073197-9156dc80-ccd5-11e9-96f3-9e2a58caf204.png)


 - 클라이언트 에러페이지

 에러페이지 경로는 클라이언트 측(/app/html/error)에 존재합니다. 초기에 사용자의 위치정보를 받아오는 데에 실패했을경우 와 서버로부터 원하는 정보를
 가져오지 못했을경우 에 발생합니다. 메인페이지 와 같은 express 모듈과 미들웨어를 사용했습니다. 이 역시 GET 방식으로 접근이 가능합니다. 클라이언트
 에서는 에러페이지로 이동하게 되는 데 window 객체의 history를 사용하게 되었습니다. replaceState 를 사용하여 페이지가 이전으로 넘어가지 못하도
 록 방지하였습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64073324-14c4fd80-ccd7-11e9-8108-f5792699c3fa.png)


 ![image](https://user-images.githubusercontent.com/11676387/64073361-b1879b00-ccd7-11e9-91dc-503d170d5088.png)


 - 서버 에러 처리

 서버 측에서 발생하는 모든 에러를 담당합니다. 표준 문서를 일부 수정하여 만들었습니다. try catch를 사용하지 않고 next()로 받는 형태로 만들게 되
 었습니다. https://expressjs.com/ko/guide/error-handling.html

 에러는 404,405,503,401 그 외는 500번 에러를 받게 되어있습니다. 다음 과 같이 핸들링을 만들게 되었고, 각자의 라우팅에서는 오류를 호출하면 연결된
 app.js 에서 그것을 감지하는 미들웨어를 사용한 것입니다.


 ![image](https://user-images.githubusercontent.com/11676387/64073497-b0f00400-ccd9-11e9-8e2f-35ac1943e6d2.png)


 ![image](https://user-images.githubusercontent.com/11676387/64073501-c36a3d80-ccd9-11e9-9431-f97699373369.png)



 1. 예를 들어 HTTP GET /forecast/&lat=37.5&lon=127.75/info 에 접근합니다.REST API 로 접근해보겠습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64073476-88680a00-ccd9-11e9-8d57-bae8df0e7ec2.png)

 다음과 같은 에러가 발생합니다. Invalid API key. Please see http://openweathermap.org/faq#error401 for more info. 이 에러가 발생하지
 만, app. js 의 미들웨어에는 존재하지 않습니다. 그 이유는 forecast 서버 측에 api를 호출하여 실패했을시 body 객체(api 가 넘겨준 정보가 들어 있는 객
 체) 안에 이미 오류를 내장하고 있기 때문에 굳이 app.js 에 넘겨줄 이유가 없습니다.


 ![image](https://user-images.githubusercontent.com/11676387/64073516-18a64f00-ccda-11e9-8e49-18a9188a7826.png)



 ![image](https://user-images.githubusercontent.com/11676387/64073591-36c07f00-ccdb-11e9-97d9-69e97df5db1d.png)


 그렇다면 다음과 같이 접근해보겠습니다. HTTP GET /forecast/seoul/info 에러가 발생하게 되고, app.js 에 내장되어 있던 에러가 발생합니다. 즉, 에러를
 감지하고 미들웨어를 작동시킨 뒤 next로 추적하여 체인처럼 하나씩 올라가다가 결국 500 에러 미들웨어에 걸려 에러가 출력되는 것입니다. 이처럼 서
 버측에서 발생하는 모든 것을 미들웨어를 통해 감지합니다. 클라이언트가 서버 측에 요청한다면 미리 만들어놓은 클라이언트 에러페이지 가 호출됩니다. (위의
 클라이언트 에러 페이지를 참고해주세요.)


 ![image](https://user-images.githubusercontent.com/11676387/64073542-7f2b6d00-ccda-11e9-90c9-e33c024cc70e.png)



 마지막으로 /app.js 를 모듈로서 만들게 되고,/main.js 가 app.js 를 웹서버로 만들게 됩니다.



 ![image](https://user-images.githubusercontent.com/11676387/64073602-5ce61f00-ccdb-11e9-9056-f7f163fc723c.png)




 # Heroku 처리

 헤로쿠 서버를 사용하기 위해 반드시 클라이언트 측의 폴더 명칭을 /app로 정의 해야되며 환경변수를 process.env.PORT 로 설정합니다.포트번호는 5000
 번입니다.


 ![image](https://user-images.githubusercontent.com/11676387/64073639-c7975a80-ccdb-11e9-83c2-f4957aab146d.png)



















