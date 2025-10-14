/**
 * Song Manager Module
 * Handles song data, loading, and navigation between songs
 */

class SongManager {
    constructor(songs, mediaElement) {
        this.songs = songs;
        this.media = mediaElement;
        this.currentSongIndex = 0;
        this.history = [];
        
        // DOM elements
        this.titleElement = document.getElementById("title");
        this.artistElement = document.getElementById("artist");
        this.songImageElement = document.getElementById("song-img");
    }

    loadSong(songIndex) {
        if (songIndex < 0 || songIndex >= this.songs.length) {
            console.error('Invalid song index:', songIndex);
            return;
        }

        const song = this.songs[songIndex];
        
        // Update media source and metadata
        this.media.src = song.song_url;
        this.titleElement.innerText = song.song_name;
        this.artistElement.innerText = song.artist_name;
        this.songImageElement.src = song.caratula;
        
        this.currentSongIndex = songIndex;
    }

    getCurrentSong() {
        return this.songs[this.currentSongIndex];
    }

    getCurrentSongIndex() {
        return this.currentSongIndex;
    }

    getSongs() {
        return this.songs;
    }

    getTotalSongs() {
        return this.songs.length;
    }

    addToHistory(songIndex) {
        this.history.push(songIndex);
    }

    getFromHistory() {
        return this.history.pop();
    }

    hasHistory() {
        return this.history.length > 0;
    }

    clearHistory() {
        this.history = [];
    }
}

export default SongManager;