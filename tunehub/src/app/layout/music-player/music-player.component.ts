import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit {

  playlist: string[] = 
  ['assets/song1.mp3',
   'assets/song2.mp3'];
  currentSongIndex: number = 0;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  currentVolume: number = 1;
  songName: string = '';
  
  ngOnInit(): void {
    this.playSong(0);
  }

  playSong(index: number): void {
    this.currentSongIndex = index;
    const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    audioPlayer.src = this.playlist[this.currentSongIndex];
    audioPlayer.load();
    audioPlayer.addEventListener('canplaythrough', () => {
      this.duration = audioPlayer.duration;
      this.songName = this.getFileNameFromUrl(audioPlayer.src);
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
}
