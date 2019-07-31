import {AfterViewChecked, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

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
  max = 1000;
  offset = 0;
  messageStatus;

  constructor(private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private render: Renderer2) {
  }

  ngOnInit() {
    this.spinner.show();
    this.usuarios = null;
    this.messageStatus = null;
    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuarioService.list(this.max, this.offset).subscribe(
      res => {
        this.usuarios = res;
        this.spinner.hide();
      });
    this.search();
  }

  ngAfterViewChecked() {
    if (this.messageStatus) this.changeStatus();
  }

  search() {
    this.spinner.show();
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(search => {
        this.spinner.hide();
        return this.usuarioService.search(search, this.offset, this.max);
      }),
    ).subscribe(usuarios => this.usuarios = usuarios);
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
      if (res.status === "OK") {
        usuario.ativo = !usuario.ativo;
        this.messageStatus = true;
      }
    });
  }
}
