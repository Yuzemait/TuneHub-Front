import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Album } from 'src/app/shared/interfaces/album'
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { Song } from 'src/app/shared/interfaces/song';
import { SongService } from 'src/app/shared/services/song.service';
import { UserService } from 'src/app/shared/services/user.service';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { User } from 'src/app/shared/interfaces/user';
import { Playlist } from 'src/app/shared/interfaces/playlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicPlayerService } from 'src/app/shared/services/music-player.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  albumId :string = ''
  selectedAlbum: Album = {id : '', title:  '', artist: '', releaseDate:'', albumImg: '', songs:[]}
  songArray: Song[] = [];
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address: '', imgId: 'default.png', ownChat: "", playlists: [] }
  playlists: Playlist[] = [];

  constructor(private route: ActivatedRoute,
    private albumService: AlbumsService,
    private songService: SongService,
    private userService: UserService,
    private playlistService: PlaylistService,
    private snackBar: MatSnackBar,
    private musicPlayerService: MusicPlayerService
   ) { }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, 
      verticalPosition: 'top'
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
    });
    if(this.albumId){
      this.albumService.getAlbumById(this.albumId).subscribe(
        data => {
          this.selectedAlbum = data
          for (const songId of this.selectedAlbum?.songs ?? []) {
            this.songService.getSongsById(songId).subscribe(
              (song: Song) => {
                this.songArray.push(song);
              },
              (error) => {
                console.error('Error getting song:', error);
              }
            );
          }
        }
      )
      
    }

    this.loadUserData();
  }

  addToPlaylist(playlistId: string, newSong: string): void {
    const updateData = { songs: newSong };

    this.playlistService.updatePlaylist(playlistId, updateData)
      .subscribe(
        (playlistActualizada) => {
          console.log('Playlist actualizada:', playlistActualizada);
          this.openSnackBar('Song added to your playlist', 'Ok');
        },
        (error) => {
          console.error('Error al actualizar la playlist:', error);
        }
      );
  }

  loadUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);

        if (this.user.playlists) {
          this.playlists = []; // Limpia la lista de reproducción antes de volver a cargar
          for (const playlistId of this.user.playlists) {
            this.playlistService.getPlaylist(playlistId).subscribe(
              (playlist: Playlist) => {
                this.playlists.push(playlist);
              },
              (error) => {
                console.error('Error getting playlist:', error);
              }
            );
          }
        }
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  playSong(songId: string, songImg: string, songName: string){
    console.log(songId, songImg);

    if (this.musicPlayerService.musicPlayer) {
      this.musicPlayerService.musicPlayer.selectSong(songId, songImg, songName);
    } else {
      console.error('MusicPlayerComponent is not defined.');
    }
  }

  playAlbum(){
    if (this.musicPlayerService.musicPlayer){
      this.musicPlayerService.musicPlayer.selectPlaylist(this.selectedAlbum.songs);
    }
  }



}
