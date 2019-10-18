import {Component, DoCheck} from '@angular/core';
import {Authentic} from "./authentic";
import {Router} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";
import {AlertService} from "./core/alert/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Authentic implements DoCheck {

  isLogged = false;
  alert;
  currentUser;

  constructor(private router: Router, private auth: AuthService, private alertService: AlertService) {
    super();
    this.currentUser = localStorage;
  }

  ngOnInit() {
    this.isLogged = this.auth.isLogged();
  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(res=> this.alert = res);
    this.isLogged = this.auth.isLogged();
  }

  checkPermission: (permission: string) => boolean;
}
