import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifySearchComponent } from '../spotify-search/spotify-search';

@Component({
  selector: 'app-queue-panel',
  standalone: true,
  imports: [CommonModule, SpotifySearchComponent],
  templateUrl: './queue-panel.html',
  styleUrl: './queue-panel.scss'
})
export class QueuePanelComponent {}
