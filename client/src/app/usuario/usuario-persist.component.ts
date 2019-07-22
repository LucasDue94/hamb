/*
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Usuario} from '../core/usuario/usuario';
import {UsuarioService} from '../core/usuario/usuario.service';
import {Response} from "@angular/http";
import { PerfilService } from '../core/perfil/perfil.service';
import { Perfil } from '../core/perfil/perfil';
import { AtendimentoService } from '../core/atendimento/atendimento.service';
import { Atendimento } from '../core/atendimento/atendimento';

@Component({
  selector: 'usuario-persist',
  templateUrl: './usuario-persist.component.html'
})
export class UsuarioPersistComponent implements OnInit {

  usuario = new Usuario();
  create = true;
  errors: any[];
  perfilList: Perfil[];
  atendimentoList: Atendimento[];

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private router: Router, private perfilService: PerfilService, private atendimentoService: AtendimentoService) {}

  ngOnInit() {
    this.perfilService.list().subscribe((perfilList: Perfil[]) => { this.perfilList = perfilList; });
    this.atendimentoService.list().subscribe((atendimentoList: Atendimento[]) => { this.atendimentoList = atendimentoList; });
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
          this.create = false;
          this.usuario = usuario;
        });
      }
      
      if (params.hasOwnProperty('perfilId')) {
        this.usuario.perfil = new Perfil({id: params['perfilId']})
      }

      
      if (params.hasOwnProperty('atendimentoId')) {
        this.usuario.atendimentos = new Atendimento({id: params['atendimentoId']})
      }

    });
  }

  save() {
    this.usuarioService.save(this.usuario).subscribe((usuario: Usuario) => {
      this.router.navigate(['/usuario', 'show', usuario.id]);
    }, (res: Response) => {
      const json = res.json();
      if (json.hasOwnProperty('message')) {
        this.errors = [json];
      } else {
        this.errors = json._embedded.errors;
      }
    });
  }
}
*/
