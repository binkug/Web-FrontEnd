var apikey = ""
//출력 영역 찾기

var disp = null;
var pageno = 1;

//자바스크립트의 스크립트를 위에 선언 했을 경우 이걸 써줘야 하고
/*window.addEventListener('load',function(event){
	
});*/
//jquery를 사용하는데 위에 스크립트를 선언 했을 경우 이걸 써주면 된다.
$(function(){
	//출력 영역 찾기
	disp = document.getElementById("disp");
	//검색 함수 호출
	search();
	//스크롤 하는 위치가 문서의 가장 하단이라면
	$(window).scroll(function(){
		//스크롤 위치
		var scrollHeight = $(window).scrollTop() + $(window).height();
		//현재 출력 중인 문서의 높이
		var documentHeight = $(document).height();
		//스크롤 하는 위치와 문서의 높이가 같으면 다음 페이지의 데이터를 가져오기
		if(scrollHeight == documentHeight){
			search(pageno + 1);
		}
	});
	
	//검색 버튼을 누르면 데이터 검색
	$('#searchbtn').click(function(){
		search();
	});
});

//페이지 번호를 매개변수로 받아서 번호에 해당하는 데이터를 찾아와서 disp 영역에 출력하는 함수
function search(no){
	if(no == undefined){
		pageno = 1;
	}else{
		pageno = no;
	}
	
	//ajax 요청
	$.ajax({
		url:'https://dapi.kakao.com/v2/search/vclip',
		data:{
			query:$('#clipname').val(),
			page:pageno,
			size:30
			},
		headers:{
			//javascript 키는 html에서 불러올때 쓰는 키 이고 rest api 키는 가져올때 사용하는 키이다.
			Authorization : "KakaoAK 3e49f66f72bc38f4bea6b7200db0b365"
		},
		type:'get',
		success:function(result){
			//console.log(result);
			if(pageno == 1){
				disp.innerHTML = '';
			}
			//데이터 출력
			var documents = result.documents;
			for(var i=0;i<documents.length;i=i+1){
				var d = documents[i];
				disp.innerHTML +='<p><a href="'+d.url+'"/></p>' +'<p>'+d.title+'</p>'; 
			}
		}
	});
}