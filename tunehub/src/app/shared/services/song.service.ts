import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadSong(file: File, songData: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    formData.append('name', songData.name);
    formData.append('artistID', songData.artistID);
    const headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer YOUR_ACCESS_TOKEN');

    return this.http.post<any>(`${this.apiUrl}songs/create`, formData, { headers });
  }
}
