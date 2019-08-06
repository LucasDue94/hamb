import {AfterViewChecked, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['usuario.component.scss']
})
export class UsuarioEditComponent implements OnInit, AfterViewChecked {

  @ViewChild('status', {static: false}) status;
  usuario: Usuario;
  searchForm: FormGroup;
  searchControl: FormControl;
  usuarioForm: FormGroup;
  messageStatus;

  constructor(private route: ActivatedRoute, private router: Router,
              private usuarioService: UsuarioService, private render: Renderer2,
              private spinner: NgxSpinnerService) {

    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuario = new Usuario();
    this.usuarioForm = new FormGroup({
      nome: new FormControl(),
      login: new FormControl(),
      crm: new FormControl({disable: true}),
      perfil: new FormControl(),
      email: new FormControl(),
      ativo: new FormControl(),
      telefone: new FormControl(),
      status: new FormControl(),
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.usuarioService.get(+params['id']).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        console.log(usuario);
        this.setFormGroup();
        this.spinner.hide();
      })
    });
  }

  ngAfterViewChecked() {
    if (this.messageStatus) this.changeStatus();
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
    if (idForm == 'perfil') {
      this.usuario['perfil'].id = this.usuarioForm.get(idForm).value;
    } else {
      this.usuario[idForm] = this.usuarioForm.get(idForm).value;
    }
  }

  changeStatus() {
    setTimeout(() => {
      this.render.removeClass(this.status.nativeElement, 'offStatus');
      this.render.addClass(this.status.nativeElement, 'onStatus');
      this.messageStatus = false;
    }, 300);
    this.render.addClass(this.status.nativeElement, 'offStatus');
    this.render.removeClass(this.status.nativeElement, 'onStatus');
  }

  save() {
    console.log(this.usuario);
    this.usuarioService.save(this.usuario).subscribe(res => {
      console.log(res);
      let r = this.router;
      this.messageStatus = true;
      setTimeout(function () {
        r.navigate(['/usuario', 'list']);
      }, 2000);
    });
  }

}
