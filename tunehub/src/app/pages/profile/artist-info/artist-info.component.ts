import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from 'src/app/pages/event/event.component';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateSongComponent } from '../create-song/create-song.component';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/interfaces/event';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ChatService } from 'src/app/shared/services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SongService } from 'src/app/shared/services/song.service';
import { Song } from 'src/app/shared/interfaces/song';
import { CreateAlbumComponent } from '../create-album/create-album.component';
import { AlbumsService } from 'src/app/shared/services/albums.service';
import { Album } from 'src/app/shared/interfaces/album';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit{
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false , imgId:''};
  events: Event[] = [];
  songs: Song[] = [];
  albums: Album[] = [];

  constructor(private userService: UserService, 
    private eventService: EventService,
    public dialog: MatDialog,
    private chatService: ChatService,
    private snackBar: MatSnackBar,
    private songService: SongService,
    private albumService: AlbumsService
    ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
        this.eventService.getArtistEvents(this.user.id).subscribe(
          (data) => {
            this.events = data;
          },
          (error) => {
            console.error('Error al obtener eventos del usuario:', error);
          }
        );

        this.songService.getSongsByArtist(this.user.id).subscribe(
          (data) => {
            this.songs = data;
          },
          (error) => {
            console.error('Error al obtener canciones del artista:', error);
          }
        );

        this.albumService.getAlbumsByArtist(this.user.id).subscribe(
          (data) => {
            this.albums = data;
          },
          (error) => {
            console.error('Error al obtener albumes del artista:', error);
          }
        );
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );

  }

  openAddEventDialog() {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '30%',
      data: { artistId: this.user.id }, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eventService.getArtistEvents(this.user.id).subscribe(
          (data) => {
            this.events = data;
          },
          (error) => {
            console.error('Error al obtener eventos del usuario:', error);
          }
        );

      }
    });
  
  }

  openAddSongDialog() {
    const dialogRef = this.dialog.open(CreateSongComponent, {
      width: '30%',
    });
  
    dialogRef.afterClosed().subscribe(result => {

      this.songService.getSongsByArtist(this.user.id).subscribe(
        (data) => {
          this.songs = data;
        },
        (error) => {
          console.error('Error al obtener canciones del artista:', error);
        }
      );
     
    });
  }
  openAddAlbumDialog() {
    const dialogRef = this.dialog.open(CreateAlbumComponent, {
      width: '30%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.albumService.getAlbumsByArtist(this.user.id).subscribe(
        (data) => {
          this.albums = data;
        },
        (error) => {
          console.error('Error al obtener canciones del artista:', error);
        }
      );
    });
  }

  editEvent(event: Event): void {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '30%',
      data: { editingEventData: event, eventId: event.id }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.getArtistEvents(this.user.id).subscribe(
          (data) => {
            this.events = data;
          },
          (error) => {
            console.error('Error al obtener eventos del usuario:', error);
          }
        );
      }
    });
  }

  deleteEvent(event: Event): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar acción',
        message: '¿Estás seguro de que quieres realizar esta acción?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const artistId = this.user.id;
        const eventId = event.id;
      
        if (artistId && eventId) {
          this.eventService.removeEvent(artistId, eventId).subscribe(
            () => {
              this.eventService.getArtistEvents(artistId).subscribe(
                (data) => {
                  this.events = data;
                },
                (error) => {
                  console.error('Error al obtener eventos del usuario:', error);
                }
              );
            },
            (error) => {
              console.error('Error al eliminar el evento:', error);
            }
          );
        } else {
          console.error('Error: artistId o eventId es undefined.');
        }
      } 
    });

  
  }

  createChat(user: User){
    let message = 'Wait while your transaction to create chat is confirmed'
    this.snackBar.open(message, 'Close', { duration: 10000 });
    this.chatService.createChat(this.user.id, this.user.username).subscribe(
      (data) => {
       
        console.log(data);
        let message = 'Your chat has been created'
      this.snackBar.open(message, 'Close', { duration: 10000 });
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
  hasChat(){
    if(this.user.ownChat){
      return true
    }
    else return false    
  }



}
