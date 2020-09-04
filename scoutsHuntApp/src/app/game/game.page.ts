import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { Game } from '../models/game';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  game: Game;

  constructor(private storage: StorageService,
              private alertController: AlertController,
              private http: HttpService,
              private router: Router) { }

  ngOnInit() {
    this.storage.getSetGame().then(data =>{
      this.game = data;
    });
    
    setInterval(()=>{
      this.refresh();
    }, 5000);
  }

  async spot(id: number, name: string){
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to spot ' + name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Yes',
          handler: () => {
            this.http.spot(id).subscribe(result =>{
             this.alert(result);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async alert(text: string){
    const alert = await this.alertController.create({
      header: 'Spot',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  end(){
    this.http.endGame(this.game.id).subscribe(result =>{
      this.storage.getSetGame(result)
      this.router.navigate(['/end']);
    });
  }

  refresh(){
    this.http.joinGame(this.game.code).subscribe(result =>{
      if(result.ended){
        this.storage.getSetGame(result)
        this.router.navigate(['/end']);
      }
    })
  }
}
