(function() {
    const constraints = { audio: true, video:false };
    const player = new Audio();
    
    const timerLabel = document.getElementById("timer");
    const title = document.getElementById("title");
    const btnRecord = document.getElementById("record");
    const btnPause = document.getElementById("pause");
    const btnResest = document.getElementById("reset");
    const btnReplay = document.getElementById("replay");
    const progress = document.getElementById("progress");
    const main = document.getElementById("main");
    const recordingslist = document.getElementById("recordingslist");
    const play_for_twice = document.getElementById("play_for_twice");
    const play_speed = [document.getElementById("speed1"), document.getElementById("speed2"), document.getElementById("speed3")];
    const random_buttons = [document.getElementById("random1"), document.getElementById("random2"), document.getElementById("random3")];
    
    var startTime = 0;
    var timer = 0;
    var playCount = 0;
    var timeDiff = 0;
    var isPlaying = false;
    var isRecoding = false;
    var lastestPlayed = null;
    var noSleep = null;
    
    var recorder = null;
    var input = null;
    var mediaStream = null;
    var audio_context = null;

    var headers = ["자기소개", "선택주제", "돌발주제", "롤플레잉"]
    var items = [
        [
            newObj("자기소개", "I", 1, ["자신감!"])
        ],

        [
            newObj("아파트", "O_APT", 4, ["동네 묘사", "이웃 소개", "동네 경험 설명", "동네 과거 현재 비교"]),
            newObj("집", "O_H", 4, ["우리 집 묘사", "내 방 묘사", "집에서 가족과 시간 보내기", "최근 변화"]),
            newObj("조깅", "O_JOG", 4, ["조깅 루틴", "부상 피하기, 조깅용 아이템", "언제부터 걸었니", "특별한 경험"]),
            newObj("영화", "O_MOV", 4, ["좋아하는 영화", "좋아하는 배우", "영화 루틴", "기억에 남는 영화"]),
            newObj("카페", "O_CAFE", 4, ["좋아하는 카페 묘사", "카페 뭐하러 누구랑가", "특별한 경험", "처음으로 갔던 카페간 날"]),
            newObj("음악", "O_MUSIC", 4, ["좋아하는 음악/가수", "언제 음악 듣니", "좋아하는 음악 변천사", "특별한 경험"]),
            newObj("여행", "O_TRIP", 4, ["좋아하는 국내여행", "여행 시 챙기는 것", "첫 해외여행 경험", "기억에 남는 여행 경험"]),
            newObj("콘서트", "O_CONT", 4, ["최근 갔던 콘서트 설명", "어떤 공연장 좋니", "어딜 자주 가니, 누구랑", "특별한 경험, 공연자"]),
            newObj("공원", "O_PARK", 4, ["좋아하는 공원 설명", "공원에서 놀면 뭐하니?", "얼마나 자주 가니, 누구랑?", "특별한 경험"]),
            newObj("해변", "O_BEACH", 4, ["좋아하는 해변 설명", "해변갈 때 챙기는 아이템", "캠핑?", "캠핑 때 특별한 경험"]),
        ],

        [
            newObj("집안일", "P_HOUSEWORK", 3, ["집안일 설명", "가족 구성원의 각 역할", "하지 못한 경험"]),
            newObj("식당", "P_REST", 3, ["어떤 음식이 나오니", "네 나라 전통 음식", "최근에 식당간 경험"]),
            newObj("인터넷", "P_INTERNET", 3, ["인터넷 쓰는게 왜 좋니", "무슨 SW 쓰니", "첨에 인터넷 쓴 경험"]),
            newObj("도서관", "P_LIB", 3, ["도서관에서 문제 있었니", "주로 가는 도서관 묘사", "최근에 간 도서관"]),
            newObj("은행", "P_BANK", 3, ["사람들은 왜 은행가", "은행 묘사", "은행 경험 이야기 해줘"]),
            newObj("재활용", "P_RECYCLE", 3, ["재활용 시스템 설명해봐라", "어떻게 집에서 재활용하니, 절차 설명", "재활용하면서 특별한 경험"]),
            newObj("교통", "P_TRANSIT", 3, ["대중교통 설명", "대중교통 과거/현재 변화", "가끔 대중교통 불편, 문제가 됐던 경험"]),
            newObj("가구", "P_FURNITURE", 3, ["좋아하는 가구", "최근에 산 가구", "전기 관련해서 문제가 생겼고, 어떻게 해결했니?"]),
            newObj("건강", "P_HEALTH", 3, ["건강을 위해 뭘 해야할까", "치과에 대한 경험", "건강을 위해 그만둔 경험"]),
            newObj("휴일", "P_HOLIDAY", 3, ["어렸을 때 특별한 휴일 경험", "큰 휴일(명절?)", "어떤 기념일이 있니, 전통음식은?"]),
            newObj("호텔", "P_HOTEL", 3, ["호텔 묘사(편의시설)", "호텔가면 뭐해", "호텔에서 특별한 경험"]),
            newObj("옷", "P_CLOTH", 3, ["특별히 무슨 옷 입니 너네 나라", "과거/현재 비교", "최근에 옷쇼핑한거"]),
            newObj("약속", "P_APPOINT", 3, ["너는 주로 뭐로 약속잡니, 누구랑", "어디서 주로 만나", "특별한 약속 경험"]),
            newObj("날씨", "P_WEATHER", 3, ["계절 묘사", "과거/현재 계절 변화", "계절때메 생긴 특별한 경험"]),
        ],

        [
            newObj("에바에게 묻기", "RA", 5, ["가족에 대해", "이사갔음", "영화", "밴쿠버", "도서관"]),
            newObj("문의", "RB", 8, ["백화점 옷", "친구에게 MP3 묻기", "요리 재료 점원에게 묻기", "카페 메뉴 묻기", "비행기 지연 문의", "해외여행 문의", "영화관람 문의", "병원 진료 문의"]),
            newObj("해결/대안", "RC", 3, ["영화 표 잘못 끊음", "비행기 취소 상황", "구매 제품 손상"]),
        ]

    ];

    function newObj(title, mp3, length, subtitles) {
        var obj = {
            "title": title,
            "mp3": mp3,
            "length": length,
            "subtitles": subtitles
        };

        return obj;
    }

    function reset() {
        playCount = 0;
        
        player.pause();
        clearTimers();

        timerLabel.innerHTML = "02:00.000";
        btnPause.innerHTML = "Pause";
        timerLabel.classList.remove("time-label-blink");
        isPlaying = false;

        progress.className = "progress-bar progress-bar-striped progress-bar-animated bg-info";
        progress.style.width = "100%";
        progress.style.width = "100%";
        title.innerText = "-";
        btnPause.setAttribute("disabled", '');

        if (noSleep != null && noSleep._wakeLock != null) {
            noSleep.disable();
        }
    }

    function getSoundSpeed() {
        if (play_speed[0].checked) {
            return 0.75;
        } else if (play_speed[2].checked) {
            return 1.5;
        } else {
            return 1;
        }
    }

    function play() {
        reset();

        player.src = "./mp3/" + lastestPlayed[0].mp3 + lastestPlayed[1] + ".mp3";
        player.playbackRate = getSoundSpeed();
        player.play();
        title.innerText = "[" +  lastestPlayed[0].title + "] " + lastestPlayed[0].subtitles[lastestPlayed[1]-1];
        isPlaying = true;

        noSleep = new NoSleep();
        noSleep.enable();

        btnPause.removeAttribute("disabled");
        $('#loading').modal({backdrop: 'static', keyboard: false});
    }

    function createCardBody(obj) {
        var bodyContainer = document.createElement("div");
        var cardBody = document.createElement("div");
        var listGroup = document.createElement("div");

        bodyContainer.className = "collapse";
        cardBody.className = "card-body";
        listGroup.className = "list-group";

        for (let i = 0; i < obj.length; ++i) {
            let btn = document.createElement("button");
            let tmp = i + 1;

            btn.className = "list-group-item list-group-item-action";
            btn.innerHTML = "질문" + (i + 1);

            if (obj.subtitles.length > 0) {
                btn.innerHTML += " - " + obj.subtitles[i];
            }

            listGroup.appendChild(btn);
            
            btn.onclick = function() {    
                lastestPlayed = [obj, tmp];
                play();
            };

        }

        cardBody.appendChild(listGroup);
        bodyContainer.appendChild(cardBody);

        return bodyContainer;
    }

    function createCardContainer(obj) {
        var cardContainer = document.createElement("div");
        var cardHeader = document.createElement("div");
        var header = document.createElement("h2");
        var cardBody = createCardBody(obj);
        
        cardContainer.className = "card";
        cardHeader.className = "card-header";
        header.className = "mb-0";

        var btn = document.createElement("div");

        btn.className = "btn btn-link d-flex justify-content-between align-items-center";
        btn.style = "display: block;";
        btn.innerHTML = obj.title + '<span class="badge badge-primary badge-pill">' + obj.length + '</span>';

        header.appendChild(btn);
        cardHeader.appendChild(header);
        cardContainer.appendChild(cardHeader);
        cardContainer.appendChild(cardBody);

        cardHeader.onclick = function() {
            $('.collapse').collapse('hide');
            $(cardContainer).find('.collapse').collapse('toggle');
        };

        return cardContainer;
    }

    function fillZero(n, number) {
        var tostr = '' + number;

        while (tostr.length < n) {
            tostr = '0' + tostr;
        }

        return tostr;
    }

    function tick() {
        var diff = parseInt(Date.now() - startTime)
        var timeLeft = (120 * 1000) - diff;
        var ms = timeLeft % 1000;
        var seconds = parseInt((timeLeft / 1000) % 60);
        var minutes = parseInt((timeLeft / 1000) / 60);
        var totalSeconds = Math.round(timeLeft / 500) / 2;
        var className = "";

        if (timeLeft >= 0) {
            timerLabel.innerHTML = fillZero(2, minutes) + ":" + fillZero(2, seconds) + "." + fillZero(3, ms);
        } else {
            progress.style.width = "0%";
            timerLabel.innerHTML = "00:00:000";
            return;
        }

        if (totalSeconds >= 70) {
            className = "progress-bar progress-bar-striped bg-info";
        } else if (totalSeconds >= 40) {
            className = "progress-bar progress-bar-striped bg-success";
        } else if (totalSeconds > 15) {
            className = "progress-bar progress-bar-striped bg-warning";
        } else {
            className = "progress-bar progress-bar-striped bg-danger";
        }

        if (totalSeconds <= 15 && timerLabel.classList.contains("time-label-blink") == false) {
            timerLabel.classList.add("time-label-blink");
        }

        if (className != progress.className) {
            progress.className = className;
        }

        var percent = (Math.max(totalSeconds / 120, 0) * 100) + '%';

        if (progress.style.width != percent) {
            progress.style.width = percent;
        }

        timer = setTimeout(tick, 53);
    }

    function createDownloadLink() {
        recorder.exportWAV(function(blob) {
            var url = URL.createObjectURL(blob);
            var div = document.createElement("div");
            var a = document.createElement("a");
            var btnRemove = document.createElement("button");
            var date = new Date();
            var name = date.getFullYear() + '_' + fillZero(2, date.getMonth() + 1) + '_' + fillZero(2, date.getDate() + 1) + '_' + fillZero(2, date.getHours()) + '_' + 
                        fillZero(2, date.getMinutes()) + '_' + fillZero(2, date.getSeconds()) + '_녹화.wav';

            a.href = url;
            a.download = name;
            a.innerText = name;
            a.className = "btn";
            
            btnRemove.innerText = "X"
            btnRemove.className = "btn btn-light";

            div.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

            btnRemove.onclick = function() {
                recordingslist.removeChild(div);
            };

            div.appendChild(a);
            div.appendChild(btnRemove);
            recordingslist.appendChild(div);
        });
    }

    function getAudioContext() {
        if (Modernizr.webaudio) {
            // supported
            window.AudioContext = window.AudioContext ||
            window.webkitAudioContext;

            return new AudioContext();
        } else {
            // not-supported
            alert("웹 오디오 지원이 되지 않는 브라우저입니다.\nIOS는 safari, 다른 기기는 chrome을 사용해주세요.");
            return null;
        }
    }

    function initAudioContext(stream) {
        audio_context = getAudioContext();

        if (audio_context == null) {
            return;
        }
        
        mediaStream = stream;
        input = audio_context.createMediaStreamSource(stream);
        recorder = new Recorder(input, {numChannels:1});

        recorder.record();
        btnRecord.innerText = 'Stop';
        isRecoding = true;
    }

    function onError(e) {
        console.error(e);
        alert("녹화를 위해서 마이크 사용을 허용해주세요!");
    }
    
    function stopRecording() {
        mediaStream.getAudioTracks()[0].stop();
        recorder.stop();
        audio_context.close();
        // 레코딩 context 삭제하는법?

        btnRecord.innerText = 'Record';
        location.href = '#recordingslist';
        isRecoding = false;
    }

    function clearTimers() {
        clearTimeout(timer);

        timer = 0;
    };

    function playRandom(id) {
        var r1 = parseInt(Math.random() * items[id].length);
        var r2 = parseInt(Math.random() * items[id][r1].length);

        lastestPlayed = [items[id][r1], 1 + r2];

        play();
    }

    btnRecord.onclick = function() {
        if (isRecoding) {
            createDownloadLink();
            stopRecording();
        } else {
            if (navigator.mediaDevices) {
                // supported
                navigator.mediaDevices.getUserMedia(constraints)
                        .then(initAudioContext)
                        .catch(onError);
            } else if (Modernizr.getusermedia) {
                // supported
                Modernizr.prefixed('getUserMedia', navigator)(constraints, initAudioContext, onError);
            } else {
                alert("웹 기술 문제로 애플 기기는 Safari로 접속해주세요!");
                return;
            }
        }
    };

    player.onended = function() {
        if (play_for_twice.checked && playCount == 0) {
            ++playCount;

            player.pause();
            player.currentTime = 0;
            player.play();
        } else {
            startTime = Date.now();
            tick()
            $('#loading').modal('hide');
        }
    };
    
    btnResest.onclick = function() { reset(); };
    btnReplay.onclick = function() { if (lastestPlayed != null) play(); };

    btnPause.onclick = function() {
        if (isPlaying == true) {
            if (timer != 0) {
                clearTimers();
                btnPause.innerText = "Start";
                timeDiff = Date.now() - startTime;

                // 녹화 중이면 마찬가지로 잠시 중지
                if (isRecoding) {
                    mediaStream.getAudioTracks()[0].enabled == false;
                }

            } else {
                startTime = Date.now() - timeDiff;
                timer = setTimeout(tick, 10);
                btnPause.innerText = "Pause";

                // 녹화 중이면 마찬가지로 다시 재개
                if (isRecoding) {
                    mediaStream.getAudioTracks()[0].enabled == true;
                }
            }
        }
    };

    random_buttons.forEach(function(e, id) {
        e.onclick = function() { playRandom(id + 1); };
    });

    (function() {
        for (let i = 0; i < items.length; ++i) {
            let container = document.createElement("div");
            let header = document.createElement("h4");

            container.className = "accordion mb-3";
            container.id = "items" + (i + 1);
            header.innerText = headers[i];

            container.appendChild(header);
            
            for (let j = 0; j < items[i].length; ++j) {
                container.appendChild(createCardContainer(items[i][j], i));
            }

            main.insertBefore(container, document.getElementById("items5"));
        }

        // $('#main').scrollspy({ target: '#nav', offset: 370 })
    })();

})();