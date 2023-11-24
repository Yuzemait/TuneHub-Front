import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { User } from 'src/app/shared/interfaces/user';
import {Chat} from 'src/app/shared/interfaces/chat';
import {Messege} from 'src/app/shared/interfaces/messege';
import { elementAt } from 'rxjs';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false }
  chats: Chat[] = []
  chat: any = ''
  chatids: [string] |undefined = ['']
  userMesseges: Messege[] = []
  othersMesseges: Messege[] = []
  allMesseges: Messege[] = []
  currentChat: string = ''
  
  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private userService: UserService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.chatids = this.user.chats
        if(this.chatids){
          this.getUserChats(this.chatids)
          this.getMessegesForChat(this.chatids[0])
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
          this.chats.push(data);        },
        (error) => {
          console.log('error getting artist', error);
        }
      );
      
    });
  }
  getMessegesForChat(chat_id: string) {
    this.currentChat = chat_id;
    this.chatService.getMessegesbyChatId(chat_id).subscribe(
      (data) => {
        this.allMesseges = data;
        this.userMesseges = [];
        this.othersMesseges = [];
        
  
        this.allMesseges.forEach(element => {
          if(element.user_id == this.user.id){
            this.userMesseges.push(element);
          } else {
            this.othersMesseges.push(element);
          }
        });
      },
      (error) => {
        console.error('Error getting messages for chat:', error);
      }
    );
  }
  sendChat(){

  }
  isUsers(m:Messege){
    console.log(m.user_id,this.user.id );
    if(m.user_id == this.user.id){
      return true
      
    }
    else{
      return false
    }

  }
  
}

