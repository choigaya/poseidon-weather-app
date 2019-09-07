$(document).ready(function() {
   // chrome 이 아닌지 확인
var agent = navigator.userAgent.toLowerCase();
   // 익스플로러 인 경우 
   if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
      // 알림창 설정
      swal({
         title: "Chrome 브라우저 가 아닙니다!",
         text: "Poseidon 은 Chrome 외의 브라우저는 지원 하지 않습니다.죄송합니다.",
         icon: "error"
      });    
   } else {
      console.log(navigator.appName);
   }
});
