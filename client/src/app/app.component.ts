import {Component, DoCheck} from '@angular/core';
import {Authentic} from "./authentic";
import {Router} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Authentic implements DoCheck {

  isLogged = false;
  currentRoute;
  currentUser;

  constructor(private route: Router, private auth: AuthService) {
    super();
    this.currentUser = localStorage;
  }

  ngDoCheck(): void {
    this.isLogged = this.auth.isLogged();
    this.currentRoute = this.route.url;
  }

  checkPermission: (permission: string) => boolean;
}
