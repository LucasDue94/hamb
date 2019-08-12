import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  systemName;
  username;
  crm;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.systemName = 'hamb';
    this.username = 'Pedro A. O. Ferreira';
    this.crm = '0001'
  }

  logout() {
    this.authService.logout(localStorage.getItem('token'));
  }

}
