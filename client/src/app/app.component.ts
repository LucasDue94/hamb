import {Component, DoCheck} from '@angular/core';
import {Authentic} from "./authentic";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Authentic implements DoCheck {

  isLogged = false;
  currentUser;

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute) {
    super();
    this.currentUser = localStorage;
  }

  ngOnInit() {
    console.log(this.route.snapshot.url)
    this.isLogged = this.auth.isLogged();
  }

  ngDoCheck(): void {
    console.log(this.route.snapshot.url)
    this.isLogged = this.auth.isLogged();
  }

  checkPermission: (permission: string) => boolean;
}
