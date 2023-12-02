import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'http://localhost:3000/albums';

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getAlbumById(albumId: string): Observable<any>{
    const url = this.baseUrl+`/${albumId}`
    return this.http.get(url);
  }
  getSongbyId(){
    
  }
}




