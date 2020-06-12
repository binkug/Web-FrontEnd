package webfrontend;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

//주소 생성
//ws://192.168.0.51:9000/webfrontend/chat
//         자기 주소                  프로젝트명         채팅 주소
@ServerEndpoint("/chat")
public class WebSocketServer {
	//클라이언트 목록을 저장할 List 생성
	//Session이 클라이언트 1개
	//모든 클라이언트가 공유해야 하므로 static으로 생성
	//자바에서 공유라는 말이 나오면 static을 생각해야 한다.
	private static List<Session> list = new ArrayList<>();
	Date date = new Date();
	String setDate = date.toString();
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
	
	//open 이벤트 처리
	@OnOpen
	public void OnOpne(Session session) {
		//list에 클라이언트를 추가
		list.add(session);
		//발생하지는 확인을 위한 코드
		System.out.println(list.size()+" 명 접속 중"+sdf.format(date));
	}
	
	@OnClose
	public void OnClose(Session session) {
		list.remove(session);
		System.out.println(list.size()+"접속 해제");
	}
	@OnMessage
	public void OnMessage(String message,Session session) {
		//메세지를 list의 모든 클라이언트에게 전송
		for(Session s : list) {
			try {
				s.getBasicRemote().sendText(message);
			} catch (Exception e) {
				System.out.println(e.getMessage());
				e.printStackTrace();
			}
		}
	}
}
