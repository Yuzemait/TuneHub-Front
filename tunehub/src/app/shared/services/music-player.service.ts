// En el servicio
import { Injectable } from '@angular/core';
import { MusicPlayerComponent } from 'src/app/layout/music-player/music-player.component';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  public musicPlayer: MusicPlayerComponent | null = null;
}
