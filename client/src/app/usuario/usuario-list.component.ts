import {AfterViewChecked, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {SpinnerService} from "../core/spinner/spinner.service";
import {AlertService} from "../core/alert/alert.service";

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioListComponent implements OnInit, AfterViewChecked {

  @ViewChild('status', {static: false}) status;
  usuarios: Usuario[];
  usuario: Usuario;
  searchForm: FormGroup;
  searchControl: FormControl;
  max = 25;
  offset = 0;
  messageStatus;
  spinner = false;

  constructor(private usuarioService: UsuarioService,
              private render: Renderer2, private spinnerService: SpinnerService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.usuarios = null;
    this.messageStatus = null;
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuarioService.list(this.max, this.offset).subscribe(
      res => {
        this.usuarios = res;
        this.spinnerService.hide();
      });
    this.search()
  }

  ngAfterViewChecked() {
    if (this.messageStatus) this.changeStatus();
  }

  scrollDown() {
    this.spinnerService.show();
    this.offset += 25;
    this.usuarioService.search(this.searchControl.value, this.offset).subscribe(usuarios => {
      usuarios.forEach(usuario => this.usuarios.push(usuario));
      this.spinnerService.hide();
    });
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinnerService.show();
        this.offset = 0;
        if (this.usuarios != undefined) this.usuarios.length = 0;
        return this.usuarioService.search(changes, this.offset)
      })
    ).subscribe(res => {
      this.usuarios = res;
      this.spinnerService.hide();
    });
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

  onOff(usuario) {
    this.usuarioService.onOff(usuario).subscribe(res => {
      const responseOk = 200;
      if (res.status === responseOk) {
        usuario.ativo = !usuario.ativo;
        this.alertService.send({message:'O status do usuário foi alterado!',type:'success',icon:'check'})
      }
    });
  }
}
