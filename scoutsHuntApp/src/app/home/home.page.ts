import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Game } from '../models/game';
import { HttpService } from '../http.service';
import { StorageService } from '../storage.service';
import { Hiker } from '../models/hiker';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  game: Game;
  length: number;
  amount: string[] = [];
  newHikers: string[] = [];

  constructor(private http: HttpService,
              private storage: StorageService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    this.storage.getSetGame().then(data =>{
      this.game = data;

      this.length = this.game.length;
      if(!this.game.hikers){
        this.game.hikers = [];
        this.newHikers = [];
        this.amount = [];
      }
    });

    setInterval(()=>{
      this.refresh();
    }, 5000);
    
  }

  refresh(event?){
    this.http.joinGame(this.game.code).subscribe(data =>{
      if(event){
        this.game = data as Game;

        if(!this.game.hikers){
          this.game.hikers = [];
          this.newHikers = [];
          this.amount = [];
        }else{
          this.newHikers = [];
          this.amount = [];
          this.game.hikers.forEach(hiker =>{
            this.amount.push("");
            this.newHikers.push(hiker.name);
          });
        }
        event.target.complete();
      }

      if(data.started){
        this.storage.getSetGame(data);
        this.router.navigate(['/game'])
      }
    });
  }

  save():void{
    if(this.game.hikers.length == this.newHikers.length){
      this.newHikers.forEach(hiker => {
        let index = this.newHikers.indexOf(hiker);
        if(hiker != this.game.hikers[index].name){

          let hikers: Hiker[] = []
          this.newHikers.forEach(h => {
            hikers.push({name: h})
          });

          this.http.addHikers(hikers, this.game.id).subscribe(() =>{
            this.game.hikers = hikers;
            if(!this.game.hikers){
              this.game.hikers = [];
              this.newHikers = [];
              this.amount = [];
            }else{
              this.amount = this.newHikers = [];
              this.game.hikers.forEach(hiker =>{
                this.amount.push("");
                this.newHikers.push(hiker.name);
              })
            }

          });
        }
      });
    }else{
      let hikers: Hiker[] = []
          this.newHikers.forEach(h => {
            hikers.push({name: h})
          });

          this.http.addHikers(hikers, this.game.id).subscribe(() =>{
            this.game.hikers = hikers;
          });
    }


    if(this.game.length != this.length){
      this.http.changeLength(this.game.id, this.length).subscribe(() =>{
        this.game.length = this.length;
      });
    }
  }

  add(){
    this.amount.push("");
    this.newHikers.push("")
  }

  remove(i : number){
    this.amount.splice(i, 1);
    this.newHikers.splice(i, 1);
  }

  async start(){
    

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to start the game?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.save();
            setTimeout(() => {
              this.http.startGame(this.game.id).subscribe(data =>{
                this.storage.getSetGame(data);
                this.router.navigate(['/game'])
              });
            },
            1000);
          }
        }
      ]
    });

    await alert.present();

  }

}
