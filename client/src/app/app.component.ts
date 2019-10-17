import {Component, DoCheck, OnInit} from '@angular/core';
import {Authentic} from "./authentic";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "./core/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Authentic implements DoCheck, OnInit {

  isLogged = false;
  currentRoute;
  currentUser;
  publicUrlForgot = false;
  publicUrlRedefinicaoSenha = false;

  constructor(private router: Router, private auth: AuthService, private route: ActivatedRoute) {
    super();
    this.currentUser = localStorage;
  }
  ngOnInit(){

  }

  ngDoCheck(): void {

    this.isLogged = localStorage.getItem('token') != null;
    this.publicUrlForgot = this.router.url === '/forgot';
    this.publicUrlRedefinicaoSenha = this.router.url === '/redefinicaodesenha/131/b5b72799d570a63b5b04d9b6dcc0947bffffafec';

    this.currentRoute = this.router.url;
  }

  checkPermission: (permission: string) => boolean;

  logout() {
    this.auth.logout(localStorage.getItem('token'));
  }
}
