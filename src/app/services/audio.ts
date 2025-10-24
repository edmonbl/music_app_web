import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song, PlaybackState } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio!: HTMLAudioElement;
  private playbackStateSubject = new BehaviorSubject<PlaybackState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    currentSong: null
  });

  private songEndedSubject = new Subject<void>();

  public playbackState$: Observable<PlaybackState> = this.playbackStateSubject.asObservable();
  public songEnded$: Observable<void> = this.songEndedSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.audio = new Audio();
      this.setupAudioEventListeners();
    }
  }

  private setupAudioEventListeners(): void {
    if (!this.audio) return;
    
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
      // Emitir evento de canción terminada
      this.songEndedSubject.next();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.updatePlaybackState({
        duration: this.audio.duration || 0
      });
    });
  }

  loadSong(song: Song): void {
    if (!this.audio) return;
    
    this.audio.src = song.audioSrc;
    this.updatePlaybackState({
      currentSong: song,
      currentTime: 0,
      isPlaying: false
    });
  }

  play(): void {
    if (!this.audio || !this.audio.src) return;
    
    this.audio.play().then(() => {
      this.updatePlaybackState({ isPlaying: true });
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  pause(): void {
    if (!this.audio) return;
    
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
    if (!this.audio) return;
    
    this.audio.currentTime = time;
    this.updatePlaybackState({ currentTime: time });
  }

  setVolume(volume: number): void {
    if (!this.audio) return;
    
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
