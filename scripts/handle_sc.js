SC.initialize({client_id:'b8f06bbb8e4e9e201f9e6e46001c3acb'}); 
// D7YkmhAjzaV0qsA9e71yKXufTMyJAX2Q

let track_name = document.getElementById("track_name");
let play_btn = document.getElementById("sc_play");
let next_btn = document.getElementById("sc_next");
let prev_btn = document.getElementById("sc_prev");

let play_mode = 0; // paused
let current_track_num = 0;
let sc_playlist = null;
let current_track = null;

let enabled = true; // due to max num of calls to api

if (enabled) {

    function updateTrackName() {
        track_name.innerText = sc_playlist.tracks[current_track_num].title;
    }

    SC.get('/playlists/1198427683').then(function(playlist) {
        sc_playlist = playlist;
        startTrack().then(() => {
            updateTrackName();
            play_btn.click();
            setTimeout(() => play_btn.click(), 500);
        });
    });

    play_btn.addEventListener("click", function() {
        if (play_mode == 0) {
            play_mode = 1;
            //console.log(sc_playlist);
            current_track.play();
            play_btn.style.backgroundImage = "url('../img/sc_pause_btn.png')";
        }
        else {
            play_mode = 0;
            current_track.pause();
            play_btn.style.backgroundImage = "url('../img/sc_play_btn.png')";
        }
    });

    prev_btn.addEventListener("click", function() {
        if (play_mode == 0) play_btn.click();
        if (current_track_num == 0) current_track_num = 1;
        current_track_num--;
        startTrack().then(() => {
            updateTrackName();
            play_btn.click();
            play_btn.click();
            //setTimeout(() => play_btn.click(), 500);
        });
    });

    next_btn.addEventListener("click", function() {
        if (play_mode == 0) play_btn.click();
        if (current_track_num == sc_playlist.track_count - 1) current_track_num = -1;
        current_track_num++;
        startTrack().then(() => {
            updateTrackName();
            play_btn.click();
            play_btn.click();
            //setTimeout(() => play_btn.click(), 500);
        });
    });

    function startTrack() {
        return new Promise((resolve) => {
            console.log("sddssd");
            SC.stream("tracks/"+sc_playlist.tracks[current_track_num].id)
                .then(function(sound) {
                    current_track = sound; 
                    current_track.on("finish", () => next_btn.click()); 
                    resolve();
                }
            );
        });
    }

}
