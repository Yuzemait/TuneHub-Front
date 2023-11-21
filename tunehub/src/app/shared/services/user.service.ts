import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  
  userRegister(username: string, email: string, password: string): Observable<Token> {
    const url: string = environment.apiUrl + 'auth/register';

    const body = { username, email, password };
    
    return this.httpClient.post<Token>(url, body);
  }


}
