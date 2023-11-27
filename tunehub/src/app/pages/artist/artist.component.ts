import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { ChatService } from 'src/app/shared/services/chat.service';
import { Event } from 'src/app/shared/interfaces/event';
import { EventService } from 'src/app/shared/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ChatpopupComponent } from './chatpopup/chatpopup.component';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  id : string = '';
  artist  = { id: '', username: '', email: '', password: '', artistStatus: false, ownChat: '' };
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false, imgId:''}
  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private userService: UserService, 
    private chatService: ChatService,
    private eventService: EventService,
    public dialog: MatDialog
    
  ) { }

  ngOnInit(): void {
    this.setUserData();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.artistService.getArtistById(this.id).subscribe(
          (data) => {
            this.artist = data;
            this.eventService.getArtistEvents(this.id).subscribe(
              (data) => {
                this.events = data;
              },
              (error) => {
                console.error('Error al obtener eventos del usuario:', error);
              }
            );
          },
          (error) => {
            console.log('error getting artist', error);
          }
        );
      }
    });
  }

  setUserData(){
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }

  openDialog(): void {
    let currentChat = {
      userProfile: this.user, 
      artistProfile: this.artist
    };
    console.log('Opening dialog with data:', currentChat);
  
    const dialogRef = this.dialog.open(ChatpopupComponent, {
      width: '40%',
      data: currentChat
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // You can also do something with the result here
    });
  }
  haveChat(){
    if(this.artist.ownChat){
      return true
    }
    else return false
  }
  
  

  }

    