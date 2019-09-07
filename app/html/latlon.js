$(document).ready(function() {

function widget(id) { // 위젯 에 관한 함수
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
    window.myWidgetParam.push({
    id: 1,
    cityid: id, // 전달받은 해당 지역의 id를 입력해줌
    appid: '50a5251236509a6a43e7a53ae4fce536', 
    units: 'metric',
    containerid: 'openweathermap-widget-1' // API를 통해 해당 위젯을 불러옴
});

(function() {
    var script = document.createElement('script');

    script.async = true;
    script.charset = "utf-8";
    script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";

    var s = document.getElementsByTagName('script')[0];

    s.parentNode.insertBefore(script, s);
  })();
} // function widget 


function chart(info) { // 차트를 찍어주는 함수
    Highcharts.chart('container', {
      chart: {
          type: 'spline'
      },
      title: {
          text: 'Current Area of Precipitation and Wind Chart'
      },
      subtitle: {
          text: 'Source: openweathermap.org'
      },
      xAxis: [{
          title: {
              text: 'Date'    
          },
          categories: [
              info[0].dt_txt,
              info[1].dt_txt,
              info[2].dt_txt,
              info[3].dt_txt,
              info[4].dt_txt,
              info[5].dt_txt,
              info[6].dt_txt,
              info[7].dt_txt,
              info[8].dt_txt,
              info[9].dt_txt,
              info[10].dt_txt
          ]
      }],
      yAxis: [{
          title: {
              text: 'Precipitation'
          },
          labels: {
              formatter: function() {
                  return this.value + 'mm';
              }
          }
      }],
      tooltip: {
          crosshairs: true,
          shared: true
      },
      plotOptions: {
          spline: {
              marker: {
                  radius: 1,
                  lineColor: '#000',
                  lineWidth: 1
              }
          }
      },
      series: [{
          name: 'Temperature',
          data: [
              info[0].main.temp,
              info[1].main.temp,
              info[2].main.temp,
              info[3].main.temp,
              info[4].main.temp,
              info[5].main.temp,
              info[6].main.temp,
              info[7].main.temp,
              info[8].main.temp,
              info[9].main.temp,
              info[10].main.temp
          ]
      }, {
          name: 'Precipitation',
          data: [
              info[0].rain,
              info[1].rain,
              info[2].rain,
              info[3].rain,
              info[4].rain,
              info[5].rain,
              info[6].rain,
              info[7].rain,
              info[8].rain,
              info[9].rain,
              info[10].rain
          ]
      }]
    });
  } // function chart 


mapboxgl.accessToken = 'pk.eyJ1IjoiY2hvaXdvb3N1bmciLCJhIjoiY2l0Z3MwczdpMDE0MzJubzMxdHA5M2NpeSJ9.wCmxMJhXAsVFSLoPJ6QBCw';

var map = new mapboxgl.Map({ // 맵을 불러옴
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-79.4512, 43.6568], // 반드시 -90 ~ 90 , -180 ~ 180 사이의 값을 지정해줌
    zoom: 8.5
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: {
        color: '#3FB1CE'
    },
    placeholder: "search",
        mapboxgl: mapboxgl
    });

    map.addControl(geocoder);

    map.on('load', function(e) {
        getLatLng();
    });

    map.on('click', function(e) { // 사용자가 마커를 클릭했을때 의 이벤트
        const longitude = e.lngLat.lng;
        const latitude = e.lngLat.lat;
        
        const locObj =  { method: 'GET', header: {} };
        const URL = `/weather/${`&lat=${latitude}&lon=${longitude}`}/info`;
        const myRequest = new Request(URL,locObj);
            

            fetch(myRequest,locObj)
            .then(function(response) {
                 return response.json();
            })
            .then(function(json) {
                const data = json;
                
                const INFO = {
                    name: data.name,
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                    weather: data.weather[0].description,
                    icon: data.weather[0].icon
                };

                var popup = new mapboxgl.Popup({
                    closeOnClick: false
                })
                .setLngLat([longitude, latitude])
                .setHTML(
                    '<div><h1 class="widget-content-title">' + INFO.name + '</h1></div>' +
                    '<img class="widget-content-img">' +
                    '<div class="widget-content-info">' +
                    '<ul class="widget-content-list">' +
                    '<li>온도:' + INFO.temp + "°C" + '</li>' +
                    '<li>최대 온도:' + INFO.temp_max + "°C" + '</li>' +
                    '<li>최저 온도:' + INFO.temp_min + "°C" + '</li>' +
                    '</ul>' +
                    '</div>'
                ).addTo(map);
                popup._content.childNodes[2].src = "https://openweathermap.org/img/wn/" + INFO.icon + "@2x.png";  
            })
            .catch(function (err) {
                console.log(err);
            });
        }); // map click event listener

    function handleGeoSuccess(position) { // 초기 위치정보를 가져오는것 에 성공 할 경우
            const marker = new mapboxgl.Marker();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;      
            
            const locObj =  { method: 'GET', header: {} };
            const URL = `/forecast/${`&lat=${latitude}&lon=${longitude}`}/info`;
            const myRequest = new Request(URL,locObj);
            
            fetch(myRequest,locObj)
            .then(function(response) {
                 return response.json();
            })
            .then(function(json) {
                const data = json;

                for (let index in data.list) {
                    if (data.list[index].hasOwnProperty('rain')) { // 강수량 이 존재할 경우 
                       if (data.list[index].rain === undefined) { // 비가 올 가능 성은 있지만 아직 확정되지 않을 경우 
                           data.list[index].rain = 0.000;
                       } else {
                           if (data.list[index].rain['3h'] === undefined) { // 3시간 이내에 비가 올 가능성은 있지만, 확정되지 않을 경우
                             data.list[index].rain['3h'] = 0.000;  
                             data.list[index].rain = data.list[index].rain['3h'];
                           } else { // 3시간 이내에 비가 올 가능성이 있는 경우
                               data.list[index].rain = data.list[index].rain['3h'];
                           }
                       }       
                    } else {
                          data.list[index].rain = 0.000; // rain 프로퍼티 를 추가 시켜준다.
                    } 

                    data.list[index].dt_txt.toString(); // string 형태로 형변환 해준다.undefined 가 섞여있음.
                    data.list[index].dt_txt = data.list[index].dt_txt.substring(11,16); // 사용자가 보기 편한것으로 보여줌.
                }

                widget(data.city.id);
                chart(data.list);
            })
            .catch(function (err) {
                window.history.replaceState({page:3}, "place error page", '/error/place');
                window.location.reload(); 
            });

            map.setCenter({
                lng: longitude,
                lat: latitude,
                zoom: 8.5
            });

            marker.setLngLat({ // 초기 설정 된 지역에 마커를 찍어준다.
                lng: map.getCenter().lng,
                lat: map.getCenter().lat
            }).addTo(map);
        } // function handleGeoSuccess

        function handleGeoError() {
            window.history.replaceState({page:2}, "place error page", '/error/location');
            window.location.reload(); 
        }// function handleGeoError 

        function getLatLng() {  
          navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
          
        } // function getLatLng
});