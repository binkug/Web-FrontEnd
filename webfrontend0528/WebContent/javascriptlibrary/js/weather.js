//문서 구조를 파악하고 나면 - document.ready
$(function(){
	var latitude;
	var longitude;
	if ("geolocation" in navigator) {	/* geolocation 사용 가능 */
		navigator.geolocation.getCurrentPosition(function(data) {
		
			latitude = data.coords.latitude;
			longitude = data.coords.longitude;
			var heading = data.coords.heading;
			
			$('#latitude').text(latitude);
			$('#longitude').text(longitude);
			$('#heading').text(heading);
			
			//요청 주소 만들기
			//var addr = 'http://api.openweathermap.org/data/2.5/weather?q=mokpo&APPID=8cb79fa7fc8457f9fc0c7c59625471a1';
			var addr = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=8cb79fa7fc8457f9fc0c7c59625471a1';
			alert(addr);
			//로딩 이미지 출력
			$('#weather_info .load_img').show();
			
			//ajax 요청
			//url 이 데이터를 가져올 주소
			//type은 요청 방식
			//data는 파라미터
			//success는 데이터를 가져왔을 때 호출되는 메소드고
			//매개변수는 가져온 데이터
			$.ajax({
				url:addr,
				type:'get',
				data:{},
				success:function(result){
					//데이터 확인
					console.log(result);
					
					//국가명과 일출,일몰 { }
					var sys = result.sys; 
					//도시이름 정보 - 문자열
					var city = result.name; 
					//날씨 - 배열 [ { } ] 
					var weather = result.weather;
					//온도 - 객체 { }
					var main = result.main;
					//국가명
					var country = sys.country;
					
					//현재, 최고 ,최저 기온 가져오기
					var temp = main.temp;
					var temp_min = main.temp_min;
					var temp_max = main.temp_max;
					
					//구름상태 ,날씨 상태코드 ,날씨 아이콘 정보
					var wmain = weather[0].main;
					var wid = weather[0].id;
					var icon = weather[0].icon;
					
					//아이콘 가져옿기
					//아이콘 가져오기
					var icon_url = "http://openweathermap.org/img/w/" + icon;
					
					//데이터 출력
					$(".city").html(city+"/"+country);
					//아이콘 출력
					$(".icon").html("<img src='" + icon_url + ".png'/>");
					//구름 상태 출력
					$(".w_id").html(wmain);
					//온도 출력
					//온도 출력
					$(".temp").html('현재기온:' + 	parseInt((temp-273.15)) + '&deg;');
					$(".temp_max").html('최고기온:' +parseInt((temp_max-273.15)) + '&deg;');
					$(".temp_min").html('최고기온:' +parseInt((temp_min-273.15)) + '&deg;');
					//로딩 이미지 숨김
					$('#weather_info .load_img').hide();

				}
			});

			
		}, function(error) {
			alert(error);
		}, {
			enableHighAccuracy: true,
			timeout: Infinity,
			maximumAge: 0
		});
	} else {	/* geolocation 사용 불가능 */
		alert('geolocation 사용 불가능');
	}
});

//$(document).ready(function(){
//	
//	if ("geolocation" in navigator) {	/* geolocation 사용 가능 */
//		navigator.geolocation.getCurrentPosition(function(data) {
//		
//			var latitude = data.coords.latitude;
//			var longitude = data.coords.longitude;
//			var heading = data.coords.heading;
//			
//			$('#latitude').text(latitude);
//			$('#longitude').text(longitude);
//			$('#heading').text(heading);
//		}, function(error) {
//			alert(error);
//		}, {
//			enableHighAccuracy: true,
//			timeout: Infinity,
//			maximumAge: 0
//		});
//	} else {	/* geolocation 사용 불가능 */
//		alert('geolocation 사용 불가능');
//	}
//	
//});
