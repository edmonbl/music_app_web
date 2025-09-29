import createPlaylist from "../utils/playlist.js";

let progress_bar = document.getElementById("progress");
let media = document.getElementById("media");
let play_btn = document.getElementById("play");
const song_img = document.getElementById("song-img");
const lastest = document.getElementById("lastest");
const forward = document.getElementById("forward");

const songs = [
        {
            song_name : "cancion CHIDA",
            artist_name: "artista 1",
            song_url: "../media/song.mp3",
            caratula: "https://picsum.photos/200"
        },
        {
            song_name : "cancion CHIDA 2",
            artist_name: "artista 1",
            song_url: "../media/song_2.mp3",
            caratula: "https://picsum.photos/200"
        },
        {
            song_name : "cancion CHIDA 3",
            artist_name: "artista 3",
            song_url: "../media/song_3.mp3",
            caratula: "https://picsum.photos/200"
        },
    ];

const last = [];

const playlist = createPlaylist(songs.length);

let playingNow;

window.addEventListener('DOMContentLoaded', () => {
    playingNow = playlist.pop()
    loadSong(playingNow);
})

function loadSong(i){
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");

    const now = songs[i];

    media.src = now.song_url;
    title.innerText = now.song_name;
    artist.innerText = now.artist_name;
    song_img.src = now.caratula;
}

media.addEventListener('loadedmetadata', () => {
    progress_bar.max = 100;
    progress_bar.value = 0;
    if(play_btn.classList.contains("pause")){
        media.play();
    }
});

media.addEventListener('error', (e) => {
    console.error('Error loading audio:', e);
    alert('Error loading audio file. Please check if the file exists.');
});

media.ontimeupdate = function updateProgressBar() {
    if (media.duration) {
        const progress_value = (this.currentTime / this.duration) * 100;
        progress_bar.value = progress_value;
    }
}

lastest.addEventListener('click', function(){
    if(last.length !== 0){
        playlist.push(playingNow);
        playingNow = last.pop();
        loadSong(playingNow);
    } else {
        console.log('No previous songs available');
    }
});
forward.addEventListener('click', function(){
    if(playlist.length !== 0){
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow);
    } else {
        console.log('No more songs in playlist');
    }
});

progress_bar.oninput = function() {
    if (media.duration) {
        media.currentTime = (this.value/100) * media.duration;
    }
}

play_btn.addEventListener("click", playPause);

function playPause(){
    if(play_btn.classList.contains("pause")){
        media.pause();
        play_btn.classList.remove("pause");
        play_btn.classList.add("play");
        play_btn.innerText = "▶"
    }else{
        media.play();
        play_btn.classList.remove("play");
        play_btn.classList.add("pause");
        play_btn.innerText = "⏸";
    }
}

