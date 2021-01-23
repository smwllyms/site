let play_btn = document.getElementById("sc_play");
let next_btn = document.getElementById("sc_next");
let prev_btn = document.getElementById("sc_prev");

let current_song = 0;
let songs = {};

function getScData() {
    songs = document.getElementsByClassName("soundsList__item");

    //prev_btn.addEventListener("click", () => document.getElementById().click());
    //next_btn.addEventListener("click", () => document.getElementById().click());
    play_btn.addEventListener("click", handleGetPlay());
}

function handleGetPlay() {
    document.getElementById("sc_iframe").contentWindow.document.getElementsByClassName("playButton")[0].click();
    console.log("clicked");
}

setTimeout(getScData, 5000);
