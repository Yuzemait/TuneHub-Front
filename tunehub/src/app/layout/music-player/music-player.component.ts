import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment';
import { SongService } from 'src/app/shared/services/song.service';
import { LyricsService } from 'src/app/shared/services/lyrics.service';
import { MatDialog } from '@angular/material/dialog';
import { LyricsComponent } from '../lyrics/lyrics.component';
@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {
  
  loginStatus: boolean = false;

  constructor(private tokenService: TokenService,
    private songService: SongService,
    private lyricsService: LyricsService,
    private dialog: MatDialog) {

    this.tokenService.loginStatus.subscribe((status:boolean) =>{
      this.loginStatus = status;
    });

  }

  playlist: string[][] = [];

  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  currentVolume: number = 1;
  songName: string = '';
  songImg: string = 'default_music.png';
  apiUrl: string = environment.apiUrl;
  
  ngOnInit(): void {
    // this.playSong(0);
    this.songService.getSongs().subscribe((data)=>{
      data.forEach(song => {
        this.playlist.push([song.song, song.name, song.songImg, song.artistName])
      });
      // console.log(this.playlist);
    })
    
  }

   playSong(index: number) {
    this.currentSongIndex = index;
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.src = environment.apiUrl+'assets/'+this.playlist[this.currentSongIndex][0];
    audioPlayer.load();
    audioPlayer.addEventListener('canplaythrough', () => {
      this.duration = audioPlayer.duration;
      this.songName = this.playlist[this.currentSongIndex][1];
      this.songImg = this.playlist[this.currentSongIndex][2];
      // Set the initial volume
      audioPlayer.volume = this.currentVolume;
    });
  }

  togglePlayback(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (this.isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    this.isPlaying = !this.isPlaying;
  }
  updateProgress(event: Event): void {
    const audioPlayer = event.target as HTMLAudioElement;
    this.currentTime = audioPlayer.currentTime;
    if (this.currentTime == audioPlayer.duration){
      this.playNext();
    }

  }

  setTime(){
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.currentTime = this.currentTime;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  updateVolume(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    this.currentVolume = audioPlayer.volume;
  }

  setVolume(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.volume = this.currentVolume;
  }

  muteVolume(): void {
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    if (audioPlayer.volume > 0){
      this.currentVolume = 0;
      audioPlayer.volume = this.currentVolume;
    } else {
      this.currentVolume = 1;
      audioPlayer.volume = this.currentVolume;
    }
  }

  playNext(): void {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.playlist.length;
    this.togglePlayback();
    this.playSong(this.currentSongIndex);
    this.togglePlayback();
  }

  playPrev(): void {
    this.currentSongIndex = (this.currentSongIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playSong(this.currentSongIndex);
  }

  getFileNameFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  getLyrics() {
    const songTitle = this.playlist[this.currentSongIndex][1];
    const artistName = this.playlist[this.currentSongIndex][3];
  
    this.lyricsService.getLyrics(songTitle, artistName).subscribe(
      (data) => {
        const lyrics = data.message.body ? data.message.body.lyrics : null;
  
        let lyricsBody = lyrics ? lyrics.lyrics_body : "No lyrics available";
  
        const dialogRef = this.dialog.open(LyricsComponent, {
          width: '60%',
          data: {
            name: songTitle,
            artist: artistName,
            lyrics: lyricsBody,
            copyright: lyricsBody === "No lyrics available" ? "" : (lyrics ? lyrics.lyrics_copyright : "")
          }
        });
  
        dialogRef.afterClosed().subscribe(() => {
  
        });
      },
      (error) => {
        console.error('Error al obtener letras:', error);
      }
    );
  }


  
}
