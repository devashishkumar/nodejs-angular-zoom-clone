import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  user = '';
  constructor(private socket: Socket, private router: Router
  ) {

  }
  ngOnInit() {

  }

  generateUuId() {
    return uuidv4();
  }

  openChat() {
    window.console.log(this.generateUuId());
    this.router.navigate(['/chat', this.generateUuId()]);
  }
}
