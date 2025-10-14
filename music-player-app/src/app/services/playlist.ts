import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private songsSubject = new BehaviorSubject<Song[]>([]);
  private currentIndexSubject = new BehaviorSubject<number>(0);

  public songs$: Observable<Song[]> = this.songsSubject.asObservable();
  public currentIndex$: Observable<number> = this.currentIndexSubject.asObservable();

  constructor() {
    this.loadDefaultPlaylist();
  }

  private loadDefaultPlaylist(): void {
    const defaultSongs: Song[] = [
      {
        id: '1',
        title: 'Song 1',
        artist: 'Artist 1',
        albumArt: 'assets/media/default_img.jpg',
        audioSrc: 'assets/media/song.mp3'
      },
      {
        id: '2',
        title: 'Song 2',
        artist: 'Artist 2',
        albumArt: 'assets/media/default_img.jpg',
        audioSrc: 'assets/media/song_2.mp3'
      },
      {
        id: '3',
        title: 'Song 3',
        artist: 'Artist 3',
        albumArt: 'assets/media/default_img.jpg',
        audioSrc: 'assets/media/song_3.mp3'
      }
    ];
    this.songsSubject.next(defaultSongs);
  }

  getCurrentSong(): Song | null {
    const songs = this.songsSubject.value;
    const index = this.currentIndexSubject.value;
    return songs[index] || null;
  }

  nextSong(): Song | null {
    const songs = this.songsSubject.value;
    const currentIndex = this.currentIndexSubject.value;
    const nextIndex = (currentIndex + 1) % songs.length;
    this.currentIndexSubject.next(nextIndex);
    return songs[nextIndex] || null;
  }

  previousSong(): Song | null {
    const songs = this.songsSubject.value;
    const currentIndex = this.currentIndexSubject.value;
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    this.currentIndexSubject.next(prevIndex);
    return songs[prevIndex] || null;
  }

  selectSong(index: number): Song | null {
    const songs = this.songsSubject.value;
    if (index >= 0 && index < songs.length) {
      this.currentIndexSubject.next(index);
      return songs[index];
    }
    return null;
  }

  getSongs(): Song[] {
    return this.songsSubject.value;
  }

  getCurrentIndex(): number {
    return this.currentIndexSubject.value;
  }
}
