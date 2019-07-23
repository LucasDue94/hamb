import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.usuarioService.list('','').subscribe(res => this.usuarios = res);
  }

  foon() {
    console.log(this.usuarios);
    // this.usuarioService.destroy(this.usuario).subscribe(res => console.log(res));
  }

}
