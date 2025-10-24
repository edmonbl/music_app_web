export interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioSrc: string;
  duration?: number;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentSong: Song | null;
}