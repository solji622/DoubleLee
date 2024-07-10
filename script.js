// my page 열고 닫기
document.addEventListener('DOMContentLoaded', function () {
    const openBtn = document.getElementById('mypage_btn');
    const myPage = document.getElementById('mypage');
    const closeBtn = document.getElementById('close_btn');

    openBtn.addEventListener('click', function () {
        myPage.classList.add('open');
    });

    closeBtn.addEventListener('click', function () {
        myPage.classList.remove('open');
    });

})


// 이미지 슬라이더
let currentIdx = 0;

const slider_wrap = document.querySelector(".images");
const slider = document.querySelectorAll(".slide");
const slider_clone = slider_wrap.firstElementChild.cloneNode(true);
slider_wrap.appendChild(slider_clone);

const left_btn = document.querySelector(".left_btn");
const right_btn = document.querySelector(".right_btn");


function moveSlider(direction = -1) { // 슬라이더 이동
    slider_wrap.style.transition = "all 0.6s";
    slider_wrap.style.marginLeft = direction * currentIdx * 100 + "%";
}

function stopSlider() { // 슬라이더 이동 멈춤
    setTimeout(() => {
        slider_wrap.style.transition = "0s";
    }, 5000);
}

function startSlider() {
    setInterval(() => { // 3초에 한번씩 실행
        currentIdx++;
        moveSlider();

        if (currentIdx == slider.length) {
            stopSlider();
            slider_wrap.style.marginLeft = "0";
            currentIdx = 0;
        }
    }, 3000);
}

// 버튼 클릭 이벤트
left_btn.addEventListener("click", () => {
    currentIdx--; // 왼쪽으로 이동
    if (currentIdx < 0) {
        currentIdx = slider.length - 1; // 마지막 슬라이드로 이동
    }
    moveSlider();
    stopSlider();
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
