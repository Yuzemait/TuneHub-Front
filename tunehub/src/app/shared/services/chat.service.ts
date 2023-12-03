import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Chat } from '../interfaces/chat';
import { environment } from 'src/environments/environment';
import { Messege } from '../interfaces/messege';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  editChatName(chat_id: string, chatName: string){
    const body = {
      'chatName': chatName,
      'chatId': chat_id
    };
    
    const url: string = `${environment.apiUrl}chats`;

    return this.httpClient.put(url, body);
    
  }

  joinChat(chat_id: string, user_id: string): Observable<any> {
    console.log(chat_id, user_id);
    if (chat_id && user_id) {
      const body = {
        'userId': user_id,
        'chatId': chat_id
      };
      
      const url: string = `${environment.apiUrl}chats/join`;
      return this.httpClient.put(url, body);
    } else {
      return throwError(() => new Error('not found'));
    }
  }
  leaveChat(chat_id: string, user_id: string): Observable<any> {
    console.log(chat_id, user_id);
    if (chat_id && user_id) {
      const body = {
        'userId': user_id,
        'chatId': chat_id
      };
      
      const url: string = `${environment.apiUrl}chats/leave`;
      return this.httpClient.put(url, body);
    } else {
      return throwError(() => new Error('not found'));
    }
  }

  getUserChatsbyChatId(chat_id:string):Observable<Chat> {
    const url: string = `${environment.apiUrl}chats/${chat_id}`
    return this.httpClient.get<Chat>(url)
  }
  getMessegesbyChatId(chat_id:string):Observable<Messege[]>{
    const url: string = `${environment.apiUrl}chats/messege/`+chat_id;
    return this.httpClient.get<Messege[]>(url)
  }

  createChat(user_id: string, username: string ){
    console.log("in chat services in create chat");
    const url: string = `${environment.apiUrl}chats/create/${user_id}`;
    const body = {
      'userId' : user_id,
      'chatName' : username
    }
    return this.httpClient.post(url, body);
  }

  getPrice(chatAddress: string){
    
    const url: string = `${environment.apiUrl}chats/price/${chatAddress}`;
    console.log(url);
    return this.httpClient.get(url);
  }

  deleteMessege(messege_id:string){
    const url: string =  `${environment.apiUrl}chats/messege/delete/${messege_id}`;
    return this.httpClient.delete(url)
  }
  editMessege( messege_id:string, content: string){
    const url: string =  `${environment.apiUrl}chats/messege/edit/${messege_id}`;
    const body = {
      'content': content
    }
    return this.httpClient.put(url, body)
  }

}
