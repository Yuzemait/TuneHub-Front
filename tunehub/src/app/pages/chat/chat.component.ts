import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/interfaces/user';
import {Chat} from 'src/app/shared/interfaces/chat'



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  chats: Chat[] = []
  id : string = '';
  chat: any = ''
  chatids: [string] |undefined = ['']
  
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.chatids = this.user.chats
        if(this.chatids){
          this.getUserChats(this.chatids)
        }
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }
  getUserChats(chatlist: [string]){
    chatlist.forEach(element => {
      this.artistService.getChatbyArtistId(element).subscribe(
        (data) => {
          this.chats.push(data);
          console.log(data);
        },
        (error) => {
          console.log('error getting artist', error);
        }
      );
      
    });
  }
}

