//아이콘 클릭 시 주소 복사
function copyToClipboard(val) {
  const t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand("copy");
  document.body.removeChild(t);
}

function copy1() {
  copyToClipboard("stella521");
  alert("아이디가 클립보드에 복사되었습니다.");
}
function copy2() {
  copyToClipboard("@parkjy0521");
  alert("아이디가 클립보드에 복사되었습니다.");
}
function copy3() {
  copyToClipboard("parkjy521@gmail.com");
  alert("메일 주소가 클립보드에 복사되었습니다.");
}

//글 저장하기 함수

// var arrBoardList = [];
var arrBoardList = [];

function saveWriting() {
  var writer = document
    .getElementsByClassName("namee")[0]
    .querySelector("input").value;
  var pw = document
    .getElementsByClassName("pw")[0]
    .querySelector("input").value;
  var writing = document
    .getElementsByClassName("contentss")[0]
    .querySelector("textarea").value;

  // 작성자와 글 내용이 정상적으로 적혀 있는지 확인
  if (writer.length <= 0 || writing.length <= 0) {
    alert("등록할 글의 작성자와 내용을 입력해주세요!");
    return;
  }

  // 비밀번호는 4자로 입력했는지 확인
  if (pw.length != 4) {
    alert("비밀번호는 4자로만 입력해주세요!");
    return;
  }

  arrBoardList.push({
    writer: writer,
    pw: pw,
    writing: writing,
  });

  //POST
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify({
      writer: writer,
      pw: pw,
      writing: writing,
    }),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

  //콘솔에 표시하기

  console.log(arrBoardList);

  displayBoardList();

  alert("글이 정상적으로 등록되었습니다!");

  document.querySelector(".background9").className = "background9";

  //기존 내용 초기화
  document.getElementsByClassName("namee")[0].querySelector("input").value = "";
  document.getElementsByClassName("pw")[0].querySelector("input").value = "";
  document
    .getElementsByClassName("contentss")[0]
    .querySelector("textarea").value = "";
}

//작성글 보드에 띄우기

function displayBoardList() {
  var boxListTag = document.getElementsByClassName("card-contents");
  var showListTag = document.getElementsByClassName("showcardlist");
  boxListTag[0].innerHTML = "";
  showListTag[0].innerHTML = "";

  for (var i = 0; i < arrBoardList.length; i++) {
    const el = arrBoardList[i];

    boxListTag[0].innerHTML +=
      '<div class="card" id="dbtn10" onclick="show10()">\
                <div class="user-name">' +
      el.writer +
      '</div>\
                <div class="details">' +
      el.writing +
      "</div>\
            </div>";
  }

  for (var i = 0; i < arrBoardList.length; i++) {
    const el = arrBoardList[i];

    showListTag[0].innerHTML +=
      '<div id="writing">\
                        <div id="w-header">\
                            <img class="close" id="eClose10" src="images/x.png" onclick="eClose10()">\
                            <span id="w-title-m">' +
      el.writer +
      '</span>\
                        </div>\
                        <div id="w-body">\
                            <div id="w-letter-m">\
                                <span class="write-m" id="letterdetail">' +
      el.writing +
      '</span>\
                            </div>\
                            <div class="w-button-m" id="edit" onclick="editletter()">\
                                <span class="w-button-letter-m">수정</span>\
                            </div>\
                            <div class="w-button-m" id="remove" onclick="deleteletter()">\
                                <span class="w-button-letter-m">삭제</span>\
                            </div>\
                        </div>\
                    </div>';
  }
}

//수정하기

function editletter() {
  eClose10();
  show9(
    (document.getElementsByClassName("namee")[0].querySelector("input").value =
      arrBoardList[0].writer),
    (document.getElementsByClassName("pw")[0].querySelector("input").value =
      arrBoardList[0].pw),
    (document
      .getElementsByClassName("contentss")[0]
      .querySelector("textarea").value = arrBoardList[0].writing)
  );
  const div = document.getElementById("dbtn10");
  div.remove();
  arrBoardList.pop();
  fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((json) => json.pop());
  // if (document
  //     .getElementsByClassName("pw")[0].querySelector("input").value !== arrBoardList[0].pw) {
  //         alert("비밀번호가 다릅니다.")
  // };
}

//삭제하기
function deleteletter() {
  var rt = confirm("글을 삭제하시겠습니까?");

  if (rt == true) {
    var user_password = prompt("비밀번호를 입력해주세요", "");
    if (user_password != arrBoardList[0].pw) {
      alert("비밀번호가 틀렸습니다.");
      var user_password = prompt("비밀번호를 입력해주세요", "");
    } else {
      const div = document.getElementById("dbtn10");
      div.remove();
      arrBoardList.pop();
      alert("정상적으로 글이 삭제되었습니다.");
      eClose10();
      fetch("http://localhost:3000/posts")
        .then((response) => response.json())
        .then((json) => json.pop());
      console.log(arrBoardList);
      //delete arrBoardList[0];
    }
  } else {
    alert("취소되었습니다.");
  }
}

//팝업창 열기

function show1() {
  document.querySelector(".background1").className = "background1 show";
}
function show2() {
  document.querySelector(".background2").className = "background2 show";
}
function show3() {
  document.querySelector(".background3").className = "background3 show";
}
function show4() {
  document.querySelector(".background4").className = "background4 show";
}
function show5() {
  document.querySelector(".background5").className = "background5 show";
}
function show6() {
  document.querySelector(".background6").className = "background6 show";
}
function show7() {
  document.querySelector(".background7").className = "background7 show";
}
function show8() {
  document.querySelector(".background8").className = "background8 show";
}
function show9() {
  document.querySelector(".background9").className = "background9 show";
}
function show10() {
  document.querySelector(".background10").className = "background10 show";
}

function eClose1() {
  document.querySelector(".background1").className = "background1";
}
function eClose2() {
  document.querySelector(".background2").className = "background2";
}
function eClose3() {
  document.querySelector(".background3").className = "background3";
}
function eClose4() {
  document.querySelector(".background4").className = "background4";
}
function eClose5() {
  document.querySelector(".background5").className = "background5";
}
function eClose6() {
  document.querySelector(".background6").className = "background6";
}
function eClose7() {
  document.querySelector(".background7").className = "background7";
}
function eClose8() {
  document.querySelector(".background8").className = "background8";
}
function eClose9() {
  document.querySelector(".background9").className = "background9";
}
function eClose10() {
  document.querySelector(".background10").className = "background10";
}

document.querySelector("#dbtn1").addEventListener("click", show1);
document.querySelector("#dbtn2").addEventListener("click", show2);
document.querySelector("#dbtn3").addEventListener("click", show3);
document.querySelector("#dbtn4").addEventListener("click", show4);
document.querySelector("#dbtn5").addEventListener("click", show5);
document.querySelector("#dbtn6").addEventListener("click", show6);
document.querySelector("#dbtn7").addEventListener("click", show7);
document.querySelector("#dbtn8").addEventListener("click", show8);
document.querySelector("#dbtn9").addEventListener("click", show9);
document.querySelector("#dbtn10").addEventListener("click", show10);

document.querySelector("#eClose1").addEventListener("click", eClose1);
document.querySelector("#eClose2").addEventListener("click", eClose2);
document.querySelector("#eClose3").addEventListener("click", eClose3);
document.querySelector("#eClose4").addEventListener("click", eClose4);
document.querySelector("#eClose5").addEventListener("click", eClose5);
document.querySelector("#eClose6").addEventListener("click", eClose6);
document.querySelector("#eClose7").addEventListener("click", eClose7);
document.querySelector("#eClose8").addEventListener("click", eClose8);
document.querySelector("#eClose9").addEventListener("click", eClose9);
document.querySelector("#eClose10").addEventListener("click", eClose10);
