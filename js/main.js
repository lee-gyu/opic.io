

$(document).ready(function() {
    var lastAudio = undefined;
    var lastClicked = undefined;
    var items = [
        [
            newObj("자기소개", "I", 1, [])
        ],

        [
            newObj("선택주제 - 아파트", "O_APT", 4, ["동네 묘사", "이웃 소개", "동네 경험 설명", "동네 과거 현재 비교"]),
            newObj("선택주제 - 집", "O_H", 4, ["우리 집 묘사", "내 방 묘사", "집에서 가족과 시간 보내기", "최근 변화"]),
            newObj("선택주제 - 조깅", "O_JOG", 4, ["조깅 루틴", "부상 피하기, 조깅용 아이템", "언제부터 걸었니", "특별한 경험"]),
            newObj("선택주제 - 영화", "O_MOV", 4, ["좋아하는 영화", "좋아하는 배우", "영화 루틴", "기억에 남는 영화"]),
            newObj("선택주제 - 카페", "O_CAFE", 4, ["좋아하는 카페 묘사", "카페 뭐하러 누구랑가", "특별한 경험", "처음으로 갔던 카페간 날"]),
            newObj("선택주제 - 음악", "O_MUSIC", 4, ["좋아하는 음악/가수", "언제 음악 듣니", "좋아하는 음악 변천사", "특별한 경험"]),
            newObj("선택주제 - 여행", "O_TRIP", 4, ["좋아하는 국내여행", "여행 시 챙기는 것", "첫 해외여행 경험", "기억에 남는 여행 경험"]),
            newObj("선택주제 - 콘서트", "O_CONT", 4, ["최근 갔던 콘서트 설명", "어떤 공연장 좋니", "어딜 자주 가니, 누구랑", "특별한 경험, 공연자"]),
            newObj("선택주제 - 공원", "O_PARK", 4, ["좋아하는 공원 설명", "공원에서 놀면 뭐하니?", "얼마나 자주 가니, 누구랑?", "특별한 경험"]),
            newObj("선택주제 - 해변", "O_BEACH", 4, ["좋아하는 해변 설명", "해변갈 때 챙기는 아이템", "캠핑?", "캠핑 때 특별한 경험"]),
        ],

        [
            newObj("돌발주제 - 집안일", "P_HOUSEWORK", 3, ["집안일 설명", "가족 구성원의 각 역할", "하지 못한 경험"]),
            newObj("돌발주제 - 식당", "P_REST", 3, ["어떤 음식이 나오니", "네 나라 전통 음식", "최근에 식당간 경험"]),
            newObj("돌발주제 - 인터넷", "P_INTERNET", 3, ["어떤 음식이 나오니", "네 나라 전통 음식", "최근에 식당간 경험"]),
        ],

        [
            newObj("롤플레잉 - 에바에게 묻기", "RA", 7, []),
            newObj("롤플레잉 - 문의", "RB", 13, []),
            newObj("롤플레잉 - 해결/대안", "RC", 5, ["1", "2", "3", "4", "5"]),
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

            btn.className = "list-group-item list-group-item-action btn";
            btn.innerHTML = "질문" + (i + 1);

            if (obj.subtitles.length > 0) {
                btn.innerHTML += " - " + obj.subtitles[i];
            }

            listGroup.appendChild(btn);
            
            btn.onclick = function() {
                if (lastAudio != undefined) {
                    lastAudio.pause();
                }
        
                var audio = new Audio();
            
                audio.src = "./mp3/" + obj.mp3 + tmp + ".mp3";
                
                audio.play();
        
                lastAudio = audio;
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

    (function init() {
        for (let i = 0; i < items.length; ++i) {
            let container = document.createElement("div");

            container.className = "accordion mt-3";

            for (let j = 0; j < items[i].length; ++j) {
                container.appendChild(createCardContainer(items[i][j]));
            }

            document.getElementById("main").appendChild(container);
        }
    })();
    
});



