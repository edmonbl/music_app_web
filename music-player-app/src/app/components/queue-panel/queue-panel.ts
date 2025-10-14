import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { PlaylistService } from '../../services/playlist';
import { AudioService } from '../../services/audio';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-queue-panel',
  imports: [CommonModule],
  templateUrl: './queue-panel.html',
  styleUrl: './queue-panel.scss'
})
export class QueuePanelComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  currentIndex: number = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private playlistService: PlaylistService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.playlistService.songs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(songs => {
        this.songs = songs;
      });

    this.playlistService.currentIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe(index => {
        this.currentIndex = index;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSongSelect(index: number): void {
    const selectedSong = this.playlistService.selectSong(index);
    if (selectedSong) {
      this.audioService.loadSong(selectedSong);
    }
  }

  isCurrentSong(index: number): boolean {
    return index === this.currentIndex;
  }

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }
}
