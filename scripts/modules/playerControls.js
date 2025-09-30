/**
 * Player Controls Module
 * Handles all audio playback controls (play, pause, seek, etc.)
 */

class PlayerControls {
    constructor(mediaElement, playButton, progressBar) {
        this.media = mediaElement;
        this.playButton = playButton;
        this.progressBar = progressBar;
        this.isPlaying = false;
        
        this.initializeControls();
    }

    initializeControls() {
        this.playButton.addEventListener("click", () => this.togglePlayPause());
        this.progressBar.addEventListener("input", () => this.seekToPosition());
        this.setupMediaEvents();
    }

    setupMediaEvents() {
        this.media.addEventListener('loadedmetadata', () => this.onMediaLoaded());
        this.media.addEventListener('timeupdate', () => this.updateProgress());
        this.media.addEventListener('error', (e) => this.handleMediaError(e));
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.media.play();
        this.isPlaying = true;
        this.updatePlayButtonState();
    }

    pause() {
        this.media.pause();
        this.isPlaying = false;
        this.updatePlayButtonState();
    }

    updatePlayButtonState() {
        if (this.isPlaying) {
            this.playButton.classList.remove("play");
            this.playButton.classList.add("pause");
            this.playButton.innerText = "⏸";
        } else {
            this.playButton.classList.remove("pause");
            this.playButton.classList.add("play");
            this.playButton.innerText = "▶";
        }
    }

    seekToPosition() {
        if (this.media.duration) {
            this.media.currentTime = (this.progressBar.value / 100) * this.media.duration;
        }
    }

    onMediaLoaded() {
        this.progressBar.max = 100;
        this.progressBar.value = 0;
        
        // Update total duration display
        const duration = this.formatTime(this.media.duration);
        document.getElementById('total-duration').textContent = duration;
        
        // Auto-play if button shows pause state
        if (this.playButton.classList.contains("pause")) {
            this.media.play();
        }
    }

    updateProgress() {
        if (this.media.duration) {
            const progressValue = (this.media.currentTime / this.media.duration) * 100;
            this.progressBar.value = progressValue;
            
            // Update current time display
            const currentTime = this.formatTime(this.media.currentTime);
            document.getElementById('current-time').textContent = currentTime;
        }
    }

    handleMediaError(error) {
        console.error('Error loading audio:', error);
        alert('Error loading audio file. Please check if the file exists.');
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

export default PlayerControls;