/// my page 열고 닫기
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('mypage_btn'); // open 버튼
    const myPage = document.getElementById('mypage'); // open 버튼 누르면 나오는 my page 영역
    const closeBtn = document.getElementById('close_btn'); // close 버튼

    openBtn.addEventListener('click', function () {
        myPage.classList.add('open');
        // css에서 버튼 누르면 right: -300 에서 0으로 돌아올 수 있게 설정
    });

    closeBtn.addEventListener('click', function () {
        myPage.classList.remove('open');
        // 추가한 open을 지움으로써 다시 -300으로 돌아옴(닫힘)
    });

})



/// my page 안에 카테고리 자연스러운 드롭 다운 
const categories = document.querySelectorAll(".cgory");

categories.forEach(item => {
    item.addEventListener("mouseover", function () {
        const drop = this.querySelector(".dropdown")
        drop.style.height = "105px";
    });
}); // 마우스 올렸을 때

categories.forEach(item => {
    item.addEventListener("mouseout", function () {
        const drop = this.querySelector(".dropdown")
        drop.style.height = "0px";
    });
}); // 마우스 땠을 때



/// 이미지 슬라이더
// 필요 변수 불러오기
const origin_slide_time = 5000; // 원래 회전 시간
const add_slide_time = 3000; // 추가 회전 시간
let slide_time = origin_slide_time; // 현재 회전 시간
let currentIdx = 0; // 현재 이미지

const slider_wrap = document.querySelector(".images"); // 이미지들
const slider = document.querySelectorAll(".slide"); // 이미지들의 길이를 구하기 위한  변수
const slider_clone = slider_wrap.firstElementChild.cloneNode(true);
slider_wrap.appendChild(slider_clone); // 첫 이미지를 뒤로 붙여 이미지의 자연스러운 변환 유도

const left_btn = document.querySelector(".left_btn");
const right_btn = document.querySelector(".right_btn");


function moveSlider(direction = -1) { // 슬라이더 이동
    slider_wrap.style.transition = "all 0.6s";
    slider_wrap.style.marginLeft = direction * currentIdx * 100 + "%"; // 누른 방향에 따라 슬라이더 이동(기본적으로 오->왼 방향)
}

function stopSlider() { // 슬라이더 이동 멈춤
    slider_wrap.style.transition = "0s";
    slide_time = origin_slide_time + add_slide_time; // 사진 오래 볼 수 있게 멈추는 시간 추가
    console.log("stop slider " + slide_time); // 확인용
}

function startSlider() { // 슬라이더 이동 시작

    setInterval(() => { // 5초에 한번씩 실행

        slide_time = origin_slide_time; // 화살표를 눌렀을 때 추가된 시간을 되돌림
        currentIdx++; // 현재 이미지는 실행하고 있으니 다음 이미지 가리키기

        moveSlider();

        if (currentIdx == slider.length) { // 마지막 이미지에 도달했을 때 티 없이 처음으로 되돌리기 (slider가 총 4개면 slider_wrap에 있는 이미지는 5개, 그 중 마지막 이미지는 첫 번째 이미지의 복사본이다.)
            setTimeout(() => {
                console.log("return first"); // 확인용
                slider_wrap.style.transition = "0s";
                slider_wrap.style.marginLeft = "0";
                currentIdx = 0;
            }, 1000);
        }

    }, slide_time); // 버튼을 누르거나 기본적으로 이동할 때에 따라 슬라이더 넘기는 속도가 달라지게 함
}

// 버튼 클릭 이벤트
left_btn.addEventListener("click", () => {
    currentIdx--; // 왼쪽으로 이동
    if (currentIdx < 0) {
        currentIdx = slider.length - 1; // 마지막 슬라이드로 이동
    }
    moveSlider();
    stopSlider(); // 원하는 사진을 더 오래 볼 수 있게 stop
});

right_btn.addEventListener("click", () => {
    currentIdx++; // 오른쪽으로 이동
    if (currentIdx >= slider.length) {
        currentIdx = 0; // 첫 번째 슬라이드로 이동
    }
    moveSlider();
    stopSlider();
});

// 슬라이더 시작
window.onload = startSlider;
