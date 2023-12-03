
import { Component, OnInit } from '@angular/core';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Playlist } from 'src/app/shared/interfaces/playlist';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, address: '', imgId: 'default.png', ownChat: "", playlists: [] }
  playlists: Playlist[] = [];

  constructor(public dialog: MatDialog, private userService: UserService, private playlistService: PlaylistService) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);

        if (this.user.playlists) {
          this.playlists = [];
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

  openAddPlaylistDialog() {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.loadUserData(); 
      }, 1000); 
    });
  }
}
