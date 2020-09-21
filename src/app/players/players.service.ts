import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Player} from './player.module';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playersUrl = 'api/players';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl).pipe(map(players => {
        return players.sort((a, b) => {
            if (a.point > b.point) {
              return 1;
            } else if (a.point === b.point) {
              return 0;
            } else {
              return -1;
            }
          }
        );
      }),
      catchError(this.handleError<Player[]>('getPlayers', []))
    );
  }

  getTopPlayers(top: number): Observable<Player[]> {
    return this.getPlayers().pipe(map(players => players.slice(0, top)),
      catchError(this.handleError<Player[]>('getTopPlayers', [])));
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.playersUrl}/${id}`)
      .pipe(
        catchError(this.handleError<Player>(`getPlayerById id=${id}`))
      );
  }

  getPlayerByName(name: string): Observable<Player[]> {
    return this.getPlayers()
      .pipe(map(players => {
          const playersResult: Player[] = [];
          for (const player of players) {
            if (player.name.toLowerCase().indexOf(name.toLowerCase()) !== -1) {
              playersResult.push(player);
            }
          }
          return playersResult;
        }),
        catchError(this.handleError<Player[]>('getTopPlayers', []))
      );
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  updatePlayers(player: Player): Observable<any> {
    return this.http.put(this.playersUrl, player, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updatePlayers'))
      );
  }

  deletePlayer(player: Player | number): Observable<Player> {
    const id = typeof player === 'number' ? player : player.id;
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, this.httpOptions).pipe(
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation, error);
      return of(result as T);
    };
  }

}
