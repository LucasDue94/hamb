import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  systemName;
  username;
  crm;

  constructor() { }

  ngOnInit() {
    this.systemName = 'hamb';
    this.username ='Pedro A. O. Ferreira';
    this.crm ='0001'
  }

}
