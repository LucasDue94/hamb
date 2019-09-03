import {Component, OnInit} from '@angular/core';
import {Authentic} from "../authentic";
import {Usuario} from "../core/usuario/usuario";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends Authentic implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {}

  isMedico = () => Usuario.isMedico(localStorage.getItem('crm'));

  checkPermission: (permission: string) => boolean;

}
