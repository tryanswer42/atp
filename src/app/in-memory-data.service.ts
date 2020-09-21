import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Player} from './players/player.module';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const players: Player[] = [
      new Player('Andy Murray', 'United States', 29, 11540, 17, 1),
      new Player('Novak Djokovic', 'Serbia', 29, 9735, 16, 2),
      new Player('Stan Wawrinkas', 'Suisse', 31, 5195, 19, 3),
      new Player('Milos Raonis', 'Canada', 26, 5000, 20, 4),
      new Player('Kei Nshikori', 'Japan', 27, 4730, 20, 5)
    ];
    return {players};
  }
}
