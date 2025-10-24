import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { SpotifyService } from '../../services/spotify';
import { PlaylistService } from '../../services/playlist';
import { AudioService } from '../../services/audio';
import { Song } from '../../models/song.model';

@Component({
  selector: 'app-spotify-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spotify-search.html',
  styleUrl: './spotify-search.scss'
})
export class SpotifySearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  searchResults: Song[] = [];
  isLoading = false;
  isSearchVisible = false;
  hasToken = false;
  errorMessage = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private spotifyService: SpotifyService,
    private playlistService: PlaylistService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    // Debounce search input
    this.searchSubject
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (query.trim().length > 0) {
          this.performSearch(query);
        } else {
          this.searchResults = [];
        }
      });

    // Esperar a que el token esté disponible antes de cargar recomendaciones
    this.spotifyService.accessToken$
      .pipe(takeUntil(this.destroy$))
      .subscribe(token => {
        console.log('Token received:', token ? 'Yes' : 'No');
        this.hasToken = !!token;
        if (token && this.searchResults.length === 0) {
          console.log('Loading recommendations...');
          this.loadRecommendations();
        } else if (!token) {
          this.errorMessage = 'Obteniendo acceso a Spotify...';
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (!this.isSearchVisible) {
      this.searchQuery = '';
      this.searchResults = [];
    }
  }

  private performSearch(query: string): void {
    console.log('Performing search for:', query);
    this.isLoading = true;
    this.errorMessage = '';
    this.spotifyService.searchTracks(query, 20)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (songs) => {
          console.log('Search results:', songs.length, 'songs');
          this.searchResults = songs;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.errorMessage = 'Error al buscar: ' + (error.message || 'Desconocido');
          this.isLoading = false;
          this.searchResults = [];
        }
      });
  }

  private loadRecommendations(): void {
    console.log('Loading popular tracks...');
    this.isLoading = true;
    this.errorMessage = '';
    
    // Buscar canciones populares con una query simple
    this.spotifyService.searchTracks('a', 20)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (songs) => {
          console.log('Popular tracks loaded:', songs.length, 'songs');
          
          if (songs.length === 0) {
            // Si no hay resultados, intentar con otra búsqueda
            this.spotifyService.searchTracks('the', 20)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (moreSongs) => {
                  this.searchResults = moreSongs;
                  this.isLoading = false;
                  if (moreSongs.length > 0) {
                    this.playlistService.setSongs(moreSongs);
                    this.audioService.loadSong(moreSongs[0]);
                  }
                },
                error: () => {
                  this.errorMessage = 'No se pudieron cargar canciones. Intenta buscar manualmente.';
                  this.isLoading = false;
                }
              });
          } else {
            this.searchResults = songs;
            this.isLoading = false;
            
            // Cargar las primeras canciones en la playlist automáticamente
            if (songs.length > 0) {
              this.playlistService.setSongs(songs);
              // Cargar la primera canción en el reproductor
              this.audioService.loadSong(songs[0]);
            }
          }
        },
        error: (error) => {
          console.error('Popular tracks error:', error);
          this.errorMessage = 'Error al cargar canciones populares. Intenta buscar manualmente.';
          this.isLoading = false;
        }
      });
  }

  onSongSelect(song: Song, index: number): void {
    // Seleccionar la canción de la playlist actual
    const allSongs = this.playlistService.getSongs();
    const songIndex = allSongs.findIndex(s => s.id === song.id);
    
    if (songIndex >= 0) {
      this.playlistService.selectSong(songIndex);
      this.audioService.loadSong(song);
      this.audioService.play();
    } else {
      // Si no está en la playlist, agregarla y reproducir
      this.playlistService.addSong(song);
      this.audioService.loadSong(song);
      this.audioService.play();
    }
  }

  addToQueue(song: Song): void {
    this.playlistService.addSong(song);
  }
}

