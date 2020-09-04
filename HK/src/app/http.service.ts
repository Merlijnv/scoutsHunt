import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game } from './models/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  game: Game;

  get(code: number){
    return this.http.get(`${environment.url}/game/${code}`)
  }
}
