import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";

@Component({
  selector: 'usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['usuario.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  usuario;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log(usuario);
      })
    });
  }

}
