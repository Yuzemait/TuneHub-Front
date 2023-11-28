import { Component } from '@angular/core';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileComponent } from '../profile.component';
import { Playlist } from 'src/app/shared/interfaces/playlist';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  constructor(public dialog: MatDialog, private userService: UserService, private playlistService: PlaylistService){

  }
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address : '' , imgId: 'default.png', ownChat:"", playlists: []}

  playlists: Playlist[]= []

  ngOnInit() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
        
        if (this.user.playlists){
          for (const playlistId of this.user.playlists) {
            this.playlistService.getPlaylist(playlistId).subscribe(
              (playlist: Playlist) => {
                // Push the playlist data to the playlistData array
                this.playlists.push(playlist);
                // console.log('Playlist Data:', this.playlists);
              },
              (error) => {
                console.error('Error getting playlist:', error);
              }
            );
          }

          console.log(this.playlists);
        }
        
        
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
    
  }


  openAddPlaylistDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '30%',
      // You can pass data or configuration here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle results if needed
    });
  }
}
