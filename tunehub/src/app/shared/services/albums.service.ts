import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<any> {
    return this.http.get(this.apiUrl+'albums');
  }
  getAlbumById(albumId: string): Observable<any>{
    const url = this.apiUrl+`albums/${albumId}`
    return this.http.get(url);
  }
  uploadAlbum(file: File, albumData: any, songs: string[]){
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('title', albumData.name);
    formData.append('artist', albumData.artistId);
    formData.append('songs', JSON.stringify(songs));
    const headers = new HttpHeaders({
    });

    return this.http.post<any>(`${this.apiUrl}albums/create`, formData, { headers });
  }
}




