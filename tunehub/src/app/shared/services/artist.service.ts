import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private baseUrl = 'http://localhost:3000/users/artists';

  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getArtistById(id: Number){
    return this.http.get(`${this.baseUrl}/${id}`)

  }

}
