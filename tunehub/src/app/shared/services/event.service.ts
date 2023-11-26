import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../interfaces/event';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  selectedEvents: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);


  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getArtistEvents(artistId: string): Observable<Event[]> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });

    const url = `${environment.apiUrl}events/${artistId}`;
    return this.http.get<Event[]>(url, {headers});
  }

  createEvent(eventData: Event): Observable<Event> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });
    const url = `${environment.apiUrl}events`;
    return this.http.post<Event>(url, eventData, { headers })
  }

  editEvent(eventId: string, updateData: Event): Observable<Event> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });
    const url = `${environment.apiUrl}events/${eventId}`;
    return this.http.put<Event>(url, updateData, { headers });
  }

  removeEvent(artistId: string, eventId: string): Observable<Event> {
    const token = this.tokenService.get();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token
    });


    const body = { artistId };

    const url = `${environment.apiUrl}events/${eventId}`;
    return this.http.request<Event>('delete', url, { body, headers });
  }



}
