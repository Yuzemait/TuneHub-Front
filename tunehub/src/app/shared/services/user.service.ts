import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  selectedUser: BehaviorSubject<User> = new BehaviorSubject<User>({ id: '', username: '', email: '', password: '', artistStatus: false, address: '', imgId: ''});
  user$ = this.selectedUser.asObservable();
  isEditModeSubject = new BehaviorSubject<boolean>(false);
  isEditMode$ = this.isEditModeSubject.asObservable();

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
    password: string | null,
    artistStatus: boolean | null,
    profilePicture: File | null
  ): Observable<User> {
    console.log(artistStatus);
    const token = this.tokenService.get();
    const formData = new FormData();
    formData.append('username',username );
    formData.append('email',email );
    if (password){
      formData.append('password', password );
    }

    if(artistStatus){
      formData.append('artistStatus', artistStatus.toString());   
    }
    // formData.append('artistStatus', artistStatus);


    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'token': token
    });

    console.log("form data: ", formData);

    const url: string = `${environment.apiUrl}users/${userId}`;

    // const body = { username, email, password, artistStatus };

    return this.httpClient.put<User>(url,  formData, { headers });
  }



  setUser(user: User) {
    this.selectedUser.next(user);
  }

  toggleEditMode(): void {
    const currentEditMode = this.isEditModeSubject.value;
    this.isEditModeSubject.next(!currentEditMode);
  }



}
