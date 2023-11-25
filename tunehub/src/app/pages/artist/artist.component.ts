import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import { ChatService } from 'src/app/shared/services/chat.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  id : string = '';
  artist: any;
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private userService: UserService, 
    private chatService: ChatService
    
  ) { }

  ngOnInit(): void {
    this.setUserData()
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.artistService.getArtistById(this.id).subscribe(
          (data) => {
            this.artist = data;
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
  joinChat(){

  }

  
  

  
  

  }

    