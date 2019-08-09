import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  systemName;
  usuarioLogado;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.systemName = 'hamb';
    this.usuarioLogado = localStorage;
  }

  logout() {
    this.authService.logout(localStorage.getItem('token'));
  }

}
