import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { Playlist} from '../interfaces/playlist';


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  apiUrl: string = environment.apiUrl;

  createPlaylist(data: any){
    const token = this.tokenService.get();
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('creator', data.creator);
    const headers = new HttpHeaders({
      'token': token
    });
    // headers = headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN');

    return this.http.post<Playlist>(`${this.apiUrl}playlists/create`, formData, { headers });


  }

  getPlaylist(id:string): Observable<Playlist> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const url: string = `${environment.apiUrl}playlists/${id}`;
    return this.http.get<Playlist>(url, { headers });
  }


  deletePlaylist(id:string): Observable<Playlist> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const url: string = `${environment.apiUrl}playlists/${id}/remove`;
    return this.http.request<Playlist>('delete', url, {  headers });
  }

  addSong(songId: string){
    
  }
}
