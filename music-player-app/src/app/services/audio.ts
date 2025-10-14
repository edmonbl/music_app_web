import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song, PlaybackState } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement;
  private playbackStateSubject = new BehaviorSubject<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    currentSong: null
  });

  public playbackState$: Observable<PlaybackState> = this.playbackStateSubject.asObservable();

  constructor() {
    this.audio = new HTMLAudioElement();
    this.setupAudioEventListeners();
  }

  private setupAudioEventListeners(): void {
    this.audio.addEventListener('timeupdate', () => {
      this.updatePlaybackState({
        currentTime: this.audio.currentTime
      });
    });

    this.audio.addEventListener('durationchange', () => {
      this.updatePlaybackState({
        duration: this.audio.duration || 0
      });
    });

    this.audio.addEventListener('ended', () => {
      this.updatePlaybackState({
        isPlaying: false,
        currentTime: 0
      });
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.updatePlaybackState({
        duration: this.audio.duration || 0
      });
    });
  }

  loadSong(song: Song): void {
    this.audio.src = song.audioSrc;
    this.updatePlaybackState({
      currentSong: song,
      currentTime: 0,
      isPlaying: false
    });
  }

  play(): void {
    if (this.audio.src) {
      this.audio.play().then(() => {
        this.updatePlaybackState({ isPlaying: true });
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  pause(): void {
    this.audio.pause();
    this.updatePlaybackState({ isPlaying: false });
  }

  togglePlayback(): void {
    if (this.playbackStateSubject.value.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setCurrentTime(time: number): void {
    this.audio.currentTime = time;
    this.updatePlaybackState({ currentTime: time });
  }

  setVolume(volume: number): void {
    this.audio.volume = volume;
    this.updatePlaybackState({ volume });
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  private updatePlaybackState(update: Partial<PlaybackState>): void {
    const currentState = this.playbackStateSubject.value;
    this.playbackStateSubject.next({ ...currentState, ...update });
  }
}
