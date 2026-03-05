// DOM Elements
let cover_image = document.querySelector(".cover-image");
let background_image = document.querySelector(".background-image");
let song_name = document.querySelector(".song-name");
let artist_name = document.querySelector(".artist-name");

let current_time = document.querySelector(".current-time");
let duration = document.querySelector(".duration");

let progress = document.querySelector(".progress");
let progress_bar = document.querySelector(".progress-bar");

let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let play_btn = document.querySelector("#play-btn");


// Songs Data
const songs = [
    {
        songPath: "assets/1.mp3",
        displayName: "The Charmer's Call",
        coverImage: "assets/1.jpg",
        artist: "Hanu Dixit"
    },
    {
        songPath: "assets/2.mp3",
        displayName: "You Will Never See Me Coming",
        coverImage: "assets/2.jpg",
        artist: "NEFFEX"
    },
    {
        songPath: "assets/3.mp3",
        displayName: "Intellect",
        coverImage: "assets/3.jpg",
        artist: "Yung Logos"
    }
];


// Variables
let currentSong = 0;
let isMusicPlay = false;

const music = new Audio();


// Load Song
function loadSong(song) {

    cover_image.src = song.coverImage;
    background_image.src = song.coverImage;

    song_name.textContent = song.displayName;
    artist_name.textContent = song.artist;

    music.src = song.songPath;

}


// Play Song
function playSong() {

    music.play();
    isMusicPlay = true;

    play_btn.classList.remove("fa-play");
    play_btn.classList.add("fa-pause");

}


// Pause Song
function pauseSong() {

    music.pause();
    isMusicPlay = false;

    play_btn.classList.remove("fa-pause");
    play_btn.classList.add("fa-play");

}


// Play Button
play_btn.addEventListener("click", () => {

    if (isMusicPlay) {
        pauseSong();
    }
    else {
        playSong();
    }

});


// Previous Song
prev.addEventListener("click", () => {

    currentSong = (currentSong - 1 + songs.length) % songs.length;

    loadSong(songs[currentSong]);
    playSong();

});


// Next Song
next.addEventListener("click", () => {

    currentSong = (currentSong + 1) % songs.length;

    loadSong(songs[currentSong]);
    playSong();

});


// Auto Next Song
music.addEventListener("ended", () => {

    currentSong = (currentSong + 1) % songs.length;

    loadSong(songs[currentSong]);
    playSong();

});


// Update Progress Bar
music.addEventListener("timeupdate", () => {

    let progressPercent = (music.currentTime / music.duration) * 100;

    progress.style.width = progressPercent + "%";


    // Current Time
    let currentMinutes = Math.floor(music.currentTime / 60);
    let currentSeconds = Math.floor(music.currentTime % 60);

    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }

    current_time.textContent = currentMinutes + ":" + currentSeconds;


    // Duration
    let durationMinutes = Math.floor(music.duration / 60);
    let durationSeconds = Math.floor(music.duration % 60);

    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }

    duration.textContent = durationMinutes + ":" + durationSeconds;

});


// Click Progress Bar
progress_bar.addEventListener("click", (e) => {

    let width = progress_bar.clientWidth;

    let clickX = e.offsetX;

    let songDuration = music.duration;

    music.currentTime = (clickX / width) * songDuration;

});


// Load First Song
loadSong(songs[currentSong]);