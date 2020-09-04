import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Hiker } from './models/hiker';
import { Observable } from 'rxjs';
import { Game } from './models/game';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  requestOptions: Object = {
    //headers: new HttpHeaders().append('Authorization', 'Bearer <yourtokenhere>'),
    responseType: 'text'
  }

  public createGame(): Observable<Game> {
    return this.http.post<Game>(`${environment.url}/game`, '');
  }

  public joinGame(code: number): Observable<Game>{
    return this.http.get<Game>(`${environment.url}/game/${code}`);
  }

  public addHikers(hikers: Hiker[], gameId: number): Observable<undefined>{
    return this.http.post<undefined>(`${environment.url}/game/hikers/${gameId}`, hikers);
  }

  public changeLength(gameId: number, length: number): Observable<undefined>{
    return this.http.get<undefined>(`${environment.url}/game/length/${gameId}/${length}`);
  }

  public startGame(gameId: number): Observable<Game>{
    return this.http.get<Game>(`${environment.url}/game/start/${gameId}`)
  }

  public spot(hikerId: number):Observable<string>{
    return this.http.post<string>(`${environment.url}/spot/${hikerId}`, '', this.requestOptions);
  }

  public endGame(id: number){
    return this.http.get<undefined>(`${environment.url}/game/end/${id}`);
  }

}
