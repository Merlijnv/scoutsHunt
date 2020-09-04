import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Game } from '../models/game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  value: number;

  constructor(private http: HttpService,
              private router: Router) { }

  ngOnInit(): void {
  }

  send(){
    this.http.get(this.value).subscribe(data =>{
      this.router.navigate(['/home', (data as Game).code]);
    });
  }

}
