const video = document.querySelector('video');

const PlaybackConst = 1000;

var lastScroll = window.scrollY;

function scrollPlay() {
    const scroll = window.scrollY;
    if (Math.abs(scroll - lastScroll) > 50) {
        video.currentTime = (window.scrollY / PlaybackConst).toFixed(3);
        lastScroll = scroll;
    }

    window.requestAnimationFrame(scrollPlay);
}

video.onloadeddata = () => {
    document.body.style.height = `${Math.floor(video.duration) * PlaybackConst}px`;
    window.requestAnimationFrame(scrollPlay);
};