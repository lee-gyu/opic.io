# OPIC.IO

- 본 프로그램의 mp3 파일은 해커스 오픽 교재에서 무료로 제공되는 파일들을 사용했습니다.

    [해커스 오픽 Start Intermediate 교재](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791158551988&orderClick=LEa&Kc=)
    (만약, 문제가 된다면 넷상에 떠도는 문제 없는 아무 mp3나 쓰겠음.)
    
- 프로그램 화면 (Web-Application)

    <img src="./img/capture.jpg" width=400/>

    - github pages 공부겸, 정적웹 만들기 연습 프로젝트
    - 오픽 모의고사 준비를 편하게 하기 위해 개발.
    - 선택 주제는 내가 선택할 것들만 골랐음.
    - boostrap을 이용해서 반응형 레이아웃, resizing 되므로, 모바일 기기에서도 UX면에서 불편함이 없음.
    - IOS Safari 호환성 때문에 고생함..

- 사용된 라이브러리 및 프레임워크
    - JQuery (https://jquery.com/)
    - Bootstrap (https://getbootstrap.com/)
    - NoSleep (https://github.com/richtr/NoSleep.js/)
    - Recorderjs (https://github.com/mattdiamond/Recorderjs)
    - Modernizr (https://modernizr.com/)

- 주요 기능
    - 타이머 기능 (일시정지, 리플레이 포함)
    - 주제별 재생 (선택, 돌발, 롤플)
    - 시간대별 진행 상태 표시 (시작, 적절, 경고, 지연 우려!)
    - 마이크 녹음 기능 (Thanks, Recordjs!)
    - 폰 이용 시, 화면 안꺼지고 유지됨 (Thanks, NoSleepJS!)
 
- 참고 사항
    - 실 서버 없이 정적 컨텐츠만으로 동작하는 웹앱
    - 즉, 유지비 없으므로 광고도 없음
    - 컴퓨터 내에서만 데이터가 처리됨, 즉 녹화 내용이 누군가에게 전송되지 않음.
    - chrome, IOS safari에서 일부 테스트 되었으나 버그 있을 수 있음!
