import { Injectable } from '@angular/core';
import { Game } from './models/game';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  getSetGame(game?:Game):Promise<Game>{
    if(game){
      this.storage.set('game', game);
    }
    return this.storage.get('game')
  }

  clear(){
    this.storage.clear();
  }
}
