import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../interfaces/song';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  uploadSong(files: File[], songData: any): Observable<any> {
    const formData: FormData = new FormData();
    console.log(songData);
    formData.append('files', files[0]);
    formData.append('files', files[1]);

    formData.append('name', songData.name);
    formData.append('artistId', songData.artistId);
    formData.append('artistName', songData.artistName);
    const headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN');

    return this.http.post<any>(`${this.apiUrl}songs/create`, formData, { headers });
  }

  getSongs(){
    return this.http.get<Song[]>(`${this.apiUrl}songs`);
  }
  getSongsById(id:string){
    return this.http.get<Song>(`${this.apiUrl}songs/${id}`);
  }

  getSongsByArtist(artistName: string): Observable<Song[]> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const url = `${this.apiUrl}songs/artist/${artistName}`;
    return this.http.get<Song[]>(url, { headers });
  }


}
