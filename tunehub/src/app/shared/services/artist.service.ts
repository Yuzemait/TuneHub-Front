import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<any> {
    const url :string = environment.apiUrl+'users/artists'
    return this.http.get(url);
  }
  getArtistById(id: string): Observable<any>{
    const url :string = environment.apiUrl+'users/'+id
    return this.http.get(url)
  }
  getChatbyArtistId(id:string): Observable<any>{
    const url: string  = environment.apiUrl +'chats/'+id
    return this.http.get(url)
  }

}
