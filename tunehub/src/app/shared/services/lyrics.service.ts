import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {


  constructor(private http: HttpClient) {}

  getLyrics(songTitle: string, artistName: string): Observable<any> {
    const url = `${environment.apiUrl}songs/get-lyrics?songTitle=${encodeURIComponent(
      songTitle
    )}&artistName=${encodeURIComponent(artistName)}`;

    return this.http.get(url);
  }
}
