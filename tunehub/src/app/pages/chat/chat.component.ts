import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../shared/services/artist.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChatService } from 'src/app/shared/services/chat.service';
import { User } from 'src/app/shared/interfaces/user';
import {Chat} from 'src/app/shared/interfaces/chat';
import {Messege} from 'src/app/shared/interfaces/messege';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatList') private chatList!: ElementRef;
  user: User = { id: '', username: '', email: '', password: '', artistStatus: false , imgId:''}
  chats: Chat[] = []
  chatids: [string] |undefined = ['']
  userMesseges: Messege[] = []
  othersMesseges: Messege[] = []
  allMesseges: Messege[] = []
  currentChat: Chat = {id: '', artist_id: '', messege_ids: [], name: '' }
  socket: Socket;
  content: string = ''
  edit: boolean = false
  filteredChats: Chat[] = [];
  searchQuery: string = '';

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  
  constructor(private route: ActivatedRoute, 
    private artistService: ArtistService, 
    private userService: UserService, 
    private chatService: ChatService) { 
    this.socket = io(environment.apiUrl)
  }

  ngOnInit(): void {
    console.log('here in ng');
    this.socket.on('userConnected', ()=>{
      console.log("un usuario se conecto");
    })
    this.socket.on('messegeReceived', (messege:Messege) => {
      this.allMesseges.push(messege)
    })
    this.setUserData()
    this.filteredChats = this.chats;
    
  }
  setUserData(){
    this.userService.getUserData().subscribe(
      (data) => {
        this.user = data;
        this.chatids = this.user.chats
        if(this.chatids){
          this.getUserChats(this.chatids)
          this.getMessegesForChat(this.chatids[0])
          this.currentChat.id = this.chatids[0]
        }
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }
  getUserChats(chatlist: [string]){
    if( this.user.ownChat){
      chatlist.push(this.user.ownChat)
    }
    let chatset = [...new Set(chatlist)];
    chatset.forEach(element => {
      this.artistService.getChatbyArtistId(element).subscribe(
        (data) => {
          this.chats.push(data);        
        },
        (error) => {
          console.log('error getting artist', error);
        }
      );
      
    });
    console.log("chats: get user chats");
  }
  getMessegesForChat(chat_id: string) {
    this.getChatById(chat_id)
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
  sendMessege() {
    console.log(this.currentChat);
    const newMessage: Messege = {
      id: '', 
      user_id: this.user.id,
      chatId: this.currentChat.id ,
      content: this.content,
      date: new Date()
    };
    this.socket.emit('messegeSent', newMessage);
    this.content = '';
  }
  getChatById(chat_id: string) {
    let chat = this.chats.find(chat => chat.id === chat_id)
    if ( chat){
      this.currentChat =  chat
  }
}
  
  isUsers(m:Messege){
    if(m.user_id == this.user.id){
      return true
    }
    else{
      return false
    }
  }
  private scrollToBottom(): void {
    try {
      this.chatList.nativeElement.scrollTop = this.chatList.nativeElement.scrollHeight;
    } catch(err) { } 
  }

  chatOwner(chat_id: string){
    if (this.user.ownChat){
      if(chat_id == this.user.ownChat){
        return true
      }
      else return false
    }
    else return false
  }
  editChatName(){
    this.edit = !this.edit
  }
  confirmName(){
    console.log(this.currentChat.name);
    this.edit = !this.edit
    this.chatService.editChatName(this.currentChat.id, this.currentChat.name).subscribe({

    })

  }
  filterChats(): void {
    this.filteredChats = []
    this.chats.filter(chat =>{
      if(chat.name){
       if( chat.name.toLowerCase().includes(this.searchQuery.toLowerCase())){
        this.filteredChats.push(chat)

       }
      }
    });
    console.log(this.filteredChats);
  }
  
  
}

