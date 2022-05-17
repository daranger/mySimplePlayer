let audio = document.createElement("AUDIO");
audio.src = document.querySelector('.track').dataset.mp3;
let isPlaying = false;
let playBtn = document.querySelector('.play');
let timeSpan = document.querySelector('.time');
let slider = document.querySelector('.slider');
let seekBar = document.querySelector('.seek-bar');
let playlist = document.querySelectorAll('.track');

function getLeft(el) {
    if (!el || typeof el === "undefined") {
        return 0;
    }
    return parseInt(el.offsetLeft) + getLeft(el.offsetParent);
}

playlist.forEach((item) => {
    item.addEventListener("click", () => {
        audio.src = item.dataset.mp3;
        audio.load();
        audio.play();
        playBtn.innerHTML = '⏸️';
    });
});

seekBar.addEventListener("click", (event) => {
    let xOffset = event.clientX - getLeft(seekBar);
    audio.currentTime = audio.duration.toFixed() * xOffset / seekBar.offsetWidth;
});


playBtn.addEventListener("click", (event) => {
    isPlaying ? audio.pause() : audio.play();
    isPlaying ? playBtn.innerHTML = '▶️' : playBtn.innerHTML = '⏸️';
});

audio.onloadedmetadata = function () {
    document.querySelector('.max-time').innerHTML = convertTime(audio.duration.toFixed());
};


function convertTime(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value - minutes * 60;
    return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

audio.ontimeupdate = function () {
    timeSpan.innerHTML = convertTime(audio.currentTime.toFixed());
    slider.style.width = audio.currentTime.toFixed() / audio.duration.toFixed() * 100 + '%';
};

audio.onplaying = function () {
    isPlaying = true;
};

audio.onpause = function () {
    isPlaying = false;
}

