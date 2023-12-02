import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Playlist } from 'src/app/shared/interfaces/playlist';
import { Song } from 'src/app/shared/interfaces/song';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { ConfirmDialogComponent } from '../profile/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  playlistId :string = ''
  selectedPlaylist: Playlist = {id : '', songs:[], name:'', creator: '', createdDate: new Date()}
  songArray: [Song] =[{
    name: '', 
    song: '',
    date: new Date,
    artistID: "",
    views: 0,
    songImg: "",
    tags: ['']

  }]
 
  constructor(private route: ActivatedRoute,
    private playlistService: PlaylistService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = params['id'];
    });
    if(this.playlistId){
      this.playlistService.getPlaylist(this.playlistId).subscribe(
        data => {
          this.selectedPlaylist = data
          console.log(data);
        }
      )
      
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
}
