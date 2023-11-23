import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
  
  userRegister(username: string, email: string, password: string): Observable<Token> {
    const url: string = environment.apiUrl + 'auth/register';

    const body = { username, email, password };
    
    return this.httpClient.post<Token>(url, body);
  }

  getUserData(): Observable<User> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const url: string = `${environment.apiUrl}users/user-data`;
    return this.httpClient.get<User>(url, {headers} );
  }

  updateUser(
    userId: string,
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    const url: string = `${environment.apiUrl}users/${userId}`;

    const body = { username, email, password };

    return this.httpClient.put<User>(url, body);
  }





}
