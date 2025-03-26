const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const totalDurationDisplay = document.getElementById("totalDuration");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const posterImage = document.getElementById("posterImage");

// Playlist
const playlist = [
    { title: "Ik Kudi", artist: "Arpit Bala", src: "songs/ik kudi.mp3", poster: "poster/ik kudi(1).jpg" },
    { title: "Sapna", artist: "Baayan", src: "songs/Sapna.mp3", poster: "poster/sapna.jpg" },
    { title: "Sahiba", artist: "Aditya Rikhari", src: "songs/Sahiba.mp3", poster: "poster/sahiba.jpg" },
    { title: "Angels for each other", artist: "Arjit Singh,Martin Garrix", src: "songs/angels.mp3", poster: "poster/angels.jpg" },
    { title: "Khuda Jaane", artist: "KK, Shilpa Rao, and Vishal Shekhar ", src: "songs/khuda jaane.mp3", poster: "poster/khuda jaane.jpg" },
    { title:"Tum se hi", artist:"Mohit Chauhan", src:"songs/tum se hi.mp3", poster:"poster/tum se hi.jpg"},
    { title:"Agar tum saath ho", artist:"Alka Yagnik, Arijit Singh", src:"songs/agar tum saath ho.mp3", poster:"poster/agar tum saath ho.jpg"},
    { title:"Dooriyan", artist:"Mohit Chauhan", src:"songs/dooriyan.mp3", poster:"poster/dooriyan.jpg"},
    { title:"Iktara" , artist:"Kavita Seth, Amit Trivedi", src:"songs/iktara.mp3", poster:"poster/iktara.jpg"},
    { title:"Raabta", artist:"Arijit Singh", src:"songs/raabta.mp3", poster:"poster/raabta.jpg"},
    { title:"Tu jaane na", artist:"Atif Aslam", src:"songs/tu jaane na.mp3", poster:"poster/tu jaane na.jpg"}
];

let currentSongIndex = 0;

// Convert seconds to MM:SS format
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Set duration when metadata loads
audio.addEventListener("loadedmetadata", () => {
    totalDurationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

// Update current time & progress bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Seek through song
progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});

// Play/Pause Toggle
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playButton.style.display = "none";
        pauseButton.style.display = "block";
    } else {
        audio.pause();
        playButton.style.display = "block";
        pauseButton.style.display = "none";
    }
}

// Play Selected Song
function playSong(index) {
    currentSongIndex = index;
    let song = playlist[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    posterImage.src = song.poster;
    audio.src = song.src;
    
    // Play after changing source
    audio.load();
    audio.play();
    
    playButton.style.display = "none";
    pauseButton.style.display = "block";
}

// Next & Previous
function next() { playSong((currentSongIndex + 1) % playlist.length); }
function previous() { playSong((currentSongIndex - 1 + playlist.length) % playlist.length); }

// Playlist Toggle
function togglePlaylist() {
    document.getElementById("playlist").classList.toggle("active");
}
