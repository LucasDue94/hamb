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
  currentUser;

  constructor(private router: Router, private auth: AuthService) {
    super();
    this.currentUser = localStorage;
  }

  ngOnInit() {
    this.isLogged = this.auth.isLogged();
    if (!this.isLogged) this.router.navigate(['login'])
  }

  ngDoCheck(): void {
    this.isLogged = this.auth.isLogged();
  }

  checkPermission: (permission: string) => boolean;
}
