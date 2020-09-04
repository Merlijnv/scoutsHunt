import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Game } from '../models/game';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private http: HttpService,
              private router: Router,
              private storage: StorageService) { }

  code: number;
  saved: boolean = false;

  ngOnInit() {
    //this.storage.clear()
    this.storage.getSetGame().then(game =>{
      if(game !== null){
        if(!game.ended){
          this.saved = true;
        }
      }
    });
  }

  continue(){
    this.storage.getSetGame().then(game =>{

      if(game !== null){
        this.saved = true;
      }

      if(game.ended){
        this.storage.clear();
        return;
      }

      if(game.started){
        this.router.navigate(['/game'])
      }else{
        this.router.navigate(['/home'])
      }
    });
  }

  create(){
    this.http.createGame().subscribe(data =>{
      this.redirect(data as Game)
    })
  }

  join(){
    this.http.joinGame(this.code).subscribe(data =>{
      this.redirect(data as Game);
    })
  }

  private redirect(game: Game){
    this.storage.getSetGame(game);
    if(game.started){
      this.router.navigate(['/game'])
    }else{
      this.router.navigate(['/home'])
    }
    
  }

}
