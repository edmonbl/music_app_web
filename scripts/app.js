/**
 * Music Player Application
 * Main application class that coordinates all modules
 */

import PlayerControls from './modules/playerControls.js';
import SongManager from './modules/songManager.js';
import NavigationController from './modules/navigationController.js';

class MusicPlayerApp {
    constructor() {
        this.initializeElements();
        this.initializeData();
        this.initializeModules();
        this.startApplication();
    }

    initializeElements() {
        // Get DOM elements
        this.progressBar = document.getElementById("progress");
        this.media = document.getElementById("media");
        this.playButton = document.getElementById("play");
    }

    initializeData() {
        // Song data
        this.songs = [
            {
                song_name: "cancion CHIDA",
                artist_name: "artista 1",
                song_url: "../media/song.mp3",
                caratula: "https://picsum.photos/200"
            },
            {
                song_name: "cancion CHIDA 2",
                artist_name: "artista 1",
                song_url: "../media/song_2.mp3",
                caratula: "https://picsum.photos/200"
            },
            {
                song_name: "cancion CHIDA 3",
                artist_name: "artista 3",
                song_url: "../media/song_3.mp3",
                caratula: "https://picsum.photos/200"
            }
        ];
    }

    initializeModules() {
        // Initialize core modules
        this.songManager = new SongManager(this.songs, this.media);
        this.playerControls = new PlayerControls(this.media, this.playButton, this.progressBar);
        this.navigationController = new NavigationController(this.songManager);
    }

    startApplication() {
        // Load initial song
        const initialSongIndex = this.navigationController.getInitialSong();
        this.songManager.loadSong(initialSongIndex);
    }

    // Public methods for external access if needed
    getCurrentSong() {
        return this.songManager.getCurrentSong();
    }

    playPause() {
        this.playerControls.togglePlayPause();
    }

    nextSong() {
        this.navigationController.playNext();
    }

    previousSong() {
        this.navigationController.playPrevious();
    }
}

// Initialize the application when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    const musicApp = new MusicPlayerApp();
    
    // Make the app instance globally available if needed
    window.musicApp = musicApp;
});