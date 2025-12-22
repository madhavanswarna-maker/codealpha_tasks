const songs = [
    {
        title: "Paapa paattu Song",
        artist: "Girishh Gopalakrishnan,Sid Sriram",
        src: "song1.mp3"
    },
    {
        title: "Sang Rahiyo Song",
        artist: "Jasleen Royal,Ujjwal Kashyap",
        src: "song2.mp3"
    }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

// Load song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

loadSong(songs[songIndex]);

// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

// Previous song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek song
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Autoplay next
audio.addEventListener("ended", nextSong);

// Time format
function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
}
