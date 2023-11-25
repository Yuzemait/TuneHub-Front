import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventComponent } from 'src/app/pages/event/event.component';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { CreateSongComponent } from '../create-song/create-song.component';

@Component({
  selector: 'app-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss']
})
export class ArtistInfoComponent implements OnInit{
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }


  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.userService.setUser(this.user);
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
  openAddEventDialog() {
    const dialogRef = this.dialog.open(EventComponent, {
      width: '30%',
      // You can pass data or configuration here
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle results if needed
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

}
