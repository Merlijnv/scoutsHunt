import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Game } from '../models/game';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  game: Game;

  constructor(private http: HttpService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let code =+ this.route.snapshot.paramMap.get('code');

    console.log(code);

    setInterval(() =>{
      this.http.get(code).subscribe(data =>{
        console.log(data);
        this.game = data as Game;
      })
    }, 5000);
  }

}
