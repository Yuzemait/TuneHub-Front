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
    const url :string = environment.apiUrl

    return this.http.get(url);
  }
  getArtistById(id: Number){
    const url :string = `environment.apiUrl/${id}`
    return this.http.get(url)
  }

}
