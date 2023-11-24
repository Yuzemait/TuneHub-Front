import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Chat } from '../interfaces/chat';
import { environment } from 'src/environments/environment';
import { Messege } from '../interfaces/messege';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  joinChat(chat_id:string, user_id:string) {
    if(chat_id && user_id){
      const url: string = `${environment.apiUrl}users/user-data`;
      return this.httpClient.get(url);
    }
    return 'not found'
  }



  getUserChatsbyChatId(chat_id:string):Observable<Chat> {
    const url: string = `${environment.apiUrl}chats/${chat_id}`
    return this.httpClient.get<Chat>(url)
  }
  getMessegesbyChatId(chat_id:string):Observable<Messege[]>{
    const url: string = `${environment.apiUrl}chats/messege/`+chat_id;
    return this.httpClient.get<[Messege]>(url)

  }
}
