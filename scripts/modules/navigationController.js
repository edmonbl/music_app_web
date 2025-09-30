/**
 * Navigation Controller Module
 * Handles song navigation (next, previous) and playlist management
 */

import createPlaylist from "../../utils/playlist.js";

class NavigationController {
    constructor(songManager) {
        this.songManager = songManager;
        this.playlist = [];
        this.initializePlaylist();
        this.setupNavigationControls();
    }

    initializePlaylist() {
        // Create shuffled playlist
        this.playlist = createPlaylist(this.songManager.getTotalSongs());
    }

    setupNavigationControls() {
        const previousButton = document.getElementById("lastest");
        const forwardButton = document.getElementById("forward");

        previousButton.addEventListener('click', () => this.playPrevious());
        forwardButton.addEventListener('click', () => this.playNext());
    }

    playNext() {
        if (this.playlist.length === 0) {
            console.log('No more songs in playlist');
            return;
        }

        // Add current song to history
        this.songManager.addToHistory(this.songManager.getCurrentSongIndex());
        
        // Get next song from playlist
        const nextSongIndex = this.playlist.pop();
        this.songManager.loadSong(nextSongIndex);
    }

    playPrevious() {
        if (!this.songManager.hasHistory()) {
            console.log('No previous songs available');
            return;
        }

        // Add current song back to playlist
        this.playlist.push(this.songManager.getCurrentSongIndex());
        
        // Get previous song from history
        const previousSongIndex = this.songManager.getFromHistory();
        this.songManager.loadSong(previousSongIndex);
    }

    getInitialSong() {
        if (this.playlist.length > 0) {
            return this.playlist.pop();
        }
        return 0; // Default to first song
    }

    hasNextSong() {
        return this.playlist.length > 0;
    }

    hasPreviousSong() {
        return this.songManager.hasHistory();
    }

    getPlaylistLength() {
        return this.playlist.length;
    }

    resetPlaylist() {
        this.initializePlaylist();
        this.songManager.clearHistory();
    }
}

export default NavigationController;