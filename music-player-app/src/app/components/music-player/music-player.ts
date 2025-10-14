import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AudioService } from '../../services/audio';
import { PlaylistService } from '../../services/playlist';
import { PlaybackState, Song } from '../../models/song.model';

@Component({
  selector: 'app-music-player',
  imports: [CommonModule],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss'
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  playbackState: PlaybackState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    currentSong: null
  };

  private destroy$ = new Subject<void>();

  constructor(
    private audioService: AudioService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.audioService.playbackState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        this.playbackState = state;
      });

    // Load the first song
    const firstSong = this.playlistService.getCurrentSong();
    if (firstSong) {
      this.audioService.loadSong(firstSong);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onPlayPause(): void {
    this.audioService.togglePlayback();
  }

  onPrevious(): void {
    const prevSong = this.playlistService.previousSong();
    if (prevSong) {
      this.audioService.loadSong(prevSong);
    }
  }

  onNext(): void {
    const nextSong = this.playlistService.nextSong();
    if (nextSong) {
      this.audioService.loadSong(nextSong);
    }
  }

  onProgressChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const time = parseFloat(target.value);
    this.audioService.setCurrentTime(time);
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const volume = parseFloat(target.value);
    this.audioService.setVolume(volume);
  }

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }

  get progressPercentage(): number {
    if (this.playbackState.duration === 0) return 0;
    return (this.playbackState.currentTime / this.playbackState.duration) * 100;
  }
}
