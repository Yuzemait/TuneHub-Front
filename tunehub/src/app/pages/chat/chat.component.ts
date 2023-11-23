import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  id : string = '';
  chat: any = ''
  chats: any = [''];
  
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.userService.getUserData().subscribe(
        (data) => {
          this.chats= data.chats;
          console.log('Chats del usuario:', this.chats);
        },
        (error) => {
          console.error('Error chats del usuario:', error);
        }
      );
      if (this.id) {
        this.getChatByUserId()
      }
      
    });
  }
  getChatByUserId(){
    this.artistService.getChatbyArtistId(this.id).subscribe(
          
      (data) => {
        this.chat = data;
        console.log(data);
      },
      (error) => {
        console.log('error getting artist', error);
      }
    );

  }

}

