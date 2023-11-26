import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from 'src/app/pages/event/event.component';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateSongComponent } from '../create-song/create-song.component';
import { EventService } from 'src/app/shared/services/event.service';
import { Event } from 'src/app/shared/interfaces/event';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit{
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false };
  events: Event[] = [];

  constructor(private userService: UserService, private eventService: EventService, public dialog: MatDialog ) {}

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
      // You can pass data or configuration here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle results if needed
    });
  }

  editEvent(event: Event): void {
    // Lógica para editar el evento
    console.log('Edit event:', event);
  }

  deleteEvent(event: Event): void {
    // Lógica para eliminar el evento
    console.log('Delete event:', event);
  }


}
