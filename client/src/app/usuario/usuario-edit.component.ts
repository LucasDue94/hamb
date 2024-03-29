import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SpinnerService} from "../core/spinner/spinner.service";
import {AlertService} from "../core/alert/alert.service";
import {Location} from "@angular/common";
import {ErrorService} from "../core/error/error.service";

@Component({
  selector: 'usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['usuario.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  @ViewChild('ativo', {static: false}) ativo;
  usuario: Usuario;
  searchForm: FormGroup;
  searchControl: FormControl;
  usuarioForm: FormGroup;
  validateArray = {
    nome: false,
    login: false,
    crm: false,
    perfil: false,
    email: false,
    telefone: false,
    ativo: false,
    isValid: true
  };


  constructor(private route: ActivatedRoute, private router: Router,
              private usuarioService: UsuarioService, private render: Renderer2,
              private spinnerService: SpinnerService, private alertService: AlertService,
              private location: Location, private errorService: ErrorService) {

    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuario = new Usuario();
    this.usuarioForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      login: new FormControl('', Validators.required),
      crm: new FormControl({disable: true}),
      perfil: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      telefone: new FormControl(),
      ativo: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        this.setFormGroup();
        this.spinnerService.hide();
      })
    });
  }

  setFormGroup() {
    this.usuarioForm.get('crm').setValue('');
    for (let key in this.usuario) {
      let keyValue = this.usuario[key];
      let control = this.usuarioForm.get(key);
      if (key == 'perfil') {
        control.setValue(keyValue.id);
      } else {
        if (this.usuarioForm.contains(key)) {
          control.setValue(typeof keyValue == 'string' ? keyValue.toLowerCase() : keyValue);
        }
      }
    }
  }

  attach(idForm) {
    this.validateForm();
    if (idForm == 'perfil') {
      this.usuario['perfil'].id = this.usuarioForm.get(idForm).value;
    } else {
      this.usuario[idForm] = this.usuarioForm.get(idForm).value;
    }
  }


  validateForm() {
    for (let key in this.usuarioForm.controls) {
      this.validateArray[key] = this.usuarioForm.get(key).invalid;
      if (this.validateArray[key]) {
        this.validateArray.isValid = false;
      }
      this.validateArray.isValid = !this.validateArray[key];
    }
  }

  save() {
    this.validateForm();
    if (this.validateArray.isValid) {
      this.usuarioService.save(this.usuario).subscribe(res => {
        if (!this.errorService.hasError(res)) {
          this.alertService.send({message: 'Usuário alterado com sucesso', type: 'success', icon: 'check'});
          this.location.back()
        }else{
          this.alertService.send({message: 'Ocorreu um erro ao salvar estas alterações.', type: 'error', icon: 'frown'});
        }
      });
    }
  }
}
