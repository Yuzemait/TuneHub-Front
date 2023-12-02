import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadSong(files: File[], songData: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('files', files[0]);
    formData.append('files', files[1]);

    formData.append('name', songData.name);
    formData.append('artistId', songData.artistId);
    const headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN');

    return this.http.post<any>(`${this.apiUrl}songs/create`, formData, { headers });
  }

  getSongs(){
    return this.http.get<Song[]>(`${this.apiUrl}songs`);
  }
  getSongsById(id:string){
    return this.http.get<Song[]>(`${this.apiUrl}songs/${id}`);
  }
}
