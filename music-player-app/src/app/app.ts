import { Component } from '@angular/core';
import { MusicPlayerComponent } from './components/music-player/music-player';
import { QueuePanelComponent } from './components/queue-panel/queue-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MusicPlayerComponent, QueuePanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'music-player-app';
}
