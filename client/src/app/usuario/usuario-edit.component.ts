import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['usuario.component.scss']
})
export class UsuarioEditComponent implements OnInit, AfterViewChecked {

  usuario: Usuario;
  searchForm: FormGroup;
  searchControl: FormControl;
  usuarioForm: FormGroup;

  constructor(private route: ActivatedRoute, private usuarioService: UsuarioService, private spinner: NgxSpinnerService) {
    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuarioForm = new FormGroup({
      nome: new FormControl(),
      login: new FormControl(),
      crm: new FormControl(),
      perfil: new FormControl(),
      email: new FormControl(),
      ativo: new FormControl(),
      telefone: new FormControl(),
      status: new FormControl(),
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
      })
    });
  }

  ngAfterViewChecked() {
    this.setFormGroup();
  }

  setFormGroup() {
    for (let key in this.usuario) {
      if (typeof key == "string") {
        let word = this.usuario[key];
           console.log(key);
         if (this.usuarioForm.contains(key) && key != 'perfil' && key!= 'ativo') {
           this.usuarioForm.controls[key].setValue(word.toLowerCase());
         }
      }
    }
  }

}
