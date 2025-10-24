import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs';
import { SpotifyTrack, SpotifySearchResponse } from '../models/spotify.model';
import { Song } from '../models/song.model';
import { spotifyConfig } from '../config/spotify.config';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private clientId = spotifyConfig.clientId;
  private clientSecret = spotifyConfig.clientSecret;
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private apiUrl = 'https://api.spotify.com/v1';
  
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  public accessToken$ = this.accessTokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAccessToken();
  }

  // Obtener token de acceso (Client Credentials Flow)
  private getAccessToken(): void {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    this.http.post<any>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        tap(response => {
          console.log('Spotify token obtained:', response.access_token);
          this.accessTokenSubject.next(response.access_token);
          // Renovar token antes de que expire
          setTimeout(() => this.getAccessToken(), (response.expires_in - 60) * 1000);
        }),
        catchError(error => {
          console.error('Error getting Spotify token:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  private getHeaders(): HttpHeaders {
    const token = this.accessTokenSubject.value;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Buscar canciones en Spotify
  searchTracks(query: string, limit: number = 20): Observable<Song[]> {
    const token = this.accessTokenSubject.value;
    if (!token) {
      return throwError(() => new Error('No access token available'));
    }

    const url = `${this.apiUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`;
    
    return this.http.get<SpotifySearchResponse>(url, { headers: this.getHeaders() })
      .pipe(
        map(response => this.convertSpotifyTracksToSongs(response.tracks.items)),
        catchError(error => {
          console.error('Error searching Spotify:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener canciones de una playlist
  getPlaylist(playlistId: string): Observable<Song[]> {
    const token = this.accessTokenSubject.value;
    if (!token) {
      return throwError(() => new Error('No access token available'));
    }

    const url = `${this.apiUrl}/playlists/${playlistId}/tracks`;
    
    return this.http.get<any>(url, { headers: this.getHeaders() })
      .pipe(
        map(response => this.convertSpotifyTracksToSongs(
          response.items.map((item: any) => item.track)
        )),
        catchError(error => {
          console.error('Error getting playlist:', error);
          return throwError(() => error);
        })
      );
  }

  // Obtener canciones recomendadas
  getRecommendations(seedTracks: string[] = [], limit: number = 20): Observable<Song[]> {
    const token = this.accessTokenSubject.value;
    if (!token) {
      return throwError(() => new Error('No access token available'));
    }

    // Usar géneros populares como seed en lugar de tracks
    const seedGenres = 'pop,rock,electronic';
    
    const url = `${this.apiUrl}/recommendations?seed_genres=${seedGenres}&limit=${limit}`;
    
    return this.http.get<any>(url, { headers: this.getHeaders() })
      .pipe(
        map(response => this.convertSpotifyTracksToSongs(response.tracks)),
        catchError(error => {
          console.error('Error getting recommendations:', error);
          return throwError(() => error);
        })
      );
  }

  // Convertir formato Spotify a formato interno
  private convertSpotifyTracksToSongs(tracks: SpotifyTrack[]): Song[] {
    return tracks
      .filter(track => track && track.id) // Solo canciones válidas con ID
      .map(track => ({
        id: track.id,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        albumArt: track.album.images[0]?.url || 'assets/media/default_img.svg',
        audioSrc: track.preview_url || '', // Puede estar vacío
        duration: track.duration_ms / 1000
      }));
  }

  // Obtener tracks populares de un artista
  getArtistTopTracks(artistId: string): Observable<Song[]> {
    const token = this.accessTokenSubject.value;
    if (!token) {
      return throwError(() => new Error('No access token available'));
    }

    const url = `${this.apiUrl}/artists/${artistId}/top-tracks?market=US`;
    
    return this.http.get<any>(url, { headers: this.getHeaders() })
      .pipe(
        map(response => this.convertSpotifyTracksToSongs(response.tracks)),
        catchError(error => {
          console.error('Error getting artist top tracks:', error);
          return throwError(() => error);
        })
      );
  }
}
