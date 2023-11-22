import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private baseUrl = 'http://localhost:3000/collections';

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}




