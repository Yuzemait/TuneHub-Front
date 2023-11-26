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

  joinChat(chat_id: string, user_id: string): Observable<any> {
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

  getUserChatsbyChatId(chat_id:string):Observable<Chat> {
    const url: string = `${environment.apiUrl}chats/${chat_id}`
    return this.httpClient.get<Chat>(url)
  }
  getMessegesbyChatId(chat_id:string):Observable<Messege[]>{
    const url: string = `${environment.apiUrl}chats/messege/`+chat_id;
    return this.httpClient.get<Messege[]>(url)
  }

  createChat(user_id: string, username: string ){
    const url: string = `${environment.apiUrl}chats/join`;
    const body = {
      'userId' : user_id,
      'chatName' : username
    }
    return this.httpClient.post(url, body);

  }

}
