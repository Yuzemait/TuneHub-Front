import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Chat } from '../interfaces/chat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }


  getUserChatsbyChatId(chat_id:string):Observable<Chat> {
    const url: string = `${environment.apiUrl}chats/${chat_id}`
    return this.httpClient.get<Chat>(url)
  }
}
