import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit {

  game: Game;

  constructor(private storage: StorageService,
              private alertController: AlertController,
              private http: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.storage.getSetGame().then(data =>{
      this.game = data;
      this.game.hikers.forEach(hiker =>{
        if(hiker.spots === undefined){
          hiker.spots = [];
        }
      });
    }); 
  }

}
