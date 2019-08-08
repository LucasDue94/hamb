import {Component, OnInit} from '@angular/core';
import {Authentic} from "../authentic";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends Authentic implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

  checkPermission: (permission: string) => boolean;

}
