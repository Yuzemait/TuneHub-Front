import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  createUser(userData: any) {
    return this.http.post('http://localhost:3000/users', userData);
  }

  login(userData: any){
    return this.http.post('http://localhost:3000/users', userData);
  }
}
