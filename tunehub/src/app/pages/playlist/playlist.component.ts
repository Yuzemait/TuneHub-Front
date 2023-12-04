import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/shared/interfaces/playlist';
import { Song } from 'src/app/shared/interfaces/song';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { ConfirmDialogComponent } from '../profile/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SongService } from 'src/app/shared/services/song.service';
import { MusicPlayerService } from 'src/app/shared/services/music-player.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlistId :string = ''
  selectedPlaylist: Playlist = {id : '', songs:[], name:'', creator: '', createdDate: new Date()}
  songArray: Song[] = [];
 
  constructor(private route: ActivatedRoute,
    private playlistService: PlaylistService,
    public dialog: MatDialog,
    private router: Router,
    private songService: SongService,
    private musicPlayerService: MusicPlayerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = params['id'];
    });
    if(this.playlistId){
      this.playlistService.getPlaylist(this.playlistId).subscribe(
        data => {
          this.selectedPlaylist = data

          for(const songId of this.selectedPlaylist.songs){
            this.songService.getSongsById(songId).subscribe(
              (song: Song) =>{
                this.songArray.push(song)
              },
              (error) => {
                console.error('Error getting song details:', error);
              }
            );
          }
          
        }
      );
    }
  }

  playPlaylist(){
    if (this.musicPlayerService.musicPlayer){
      this.musicPlayerService.musicPlayer.selectPlaylist(this.selectedPlaylist.songs);
    }
  }

  formatDate(date: Date): string {
    return formatDate(date, 'MMMM d, y', 'en-US');
  }

  
  deletePlaylist(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar playlist',
        message: '¿Estás seguro de que quieres realizar esta acción?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.playlistService.deletePlaylist(this.selectedPlaylist.id).subscribe(
          (data) => {
            console.log('Playlist eliminada correctamente:', data);
            this.router.navigate(['profile']);
          },
          (error) => {
            console.error('Error al eliminar la playlist:', error);
          }
        );
      } 
    });   
  }
  
  playSong(songId: string, songImg: string, songName: string, artistName: string){
    console.log(songId, songImg);

    if (this.musicPlayerService.musicPlayer) {
      this.musicPlayerService.musicPlayer.selectSong(songId, songImg, songName, artistName);
    } else {
      console.error('MusicPlayerComponent is not defined.');
    }
  }

  deleteSongFromPlaylist(songId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar canción',
        message: '¿Estás seguro de que quieres eliminar esta canción de la playlist?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      
        this.playlistService.updatePlaylist(this.selectedPlaylist.id, { removeSongs: [songId] }).subscribe(
          (data) => {
            console.log('Canción eliminada correctamente de la playlist:', data);
          
            this.songArray = this.songArray.filter(song => song.id !== songId);
          },
          (error) => {
            console.error('Error al eliminar la canción de la playlist:', error);
          }
        );
      }
    });
  }
  
}
