import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../core/usuario/usuario.service";
import {Usuario} from "../core/usuario/usuario";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  searchForm: FormGroup;
  searchControl: FormControl;
  max = 1000;
  offset = 0;

  constructor(private usuarioService: UsuarioService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.show();
    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.usuarioService.list(this.max, this.offset).subscribe(
      res => {
        this.usuarios = res;
        this.close();
      });
    this.search();
  }

  search() {
    this.show();
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(search => {
        console.log(search);
        this.close();
        return this.usuarioService.search(search, this.offset, this.max);
      }),
    ).subscribe(usuarios => this.usuarios = usuarios)
  }

  show() {
    this.spinner.show();
  }

  close() {
    this.spinner.hide();

  }
}
