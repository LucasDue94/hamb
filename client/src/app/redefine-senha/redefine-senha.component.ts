import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RedefineSenhaService} from "../core/redefineSenha/redefine-senha.service";
import {Forgot} from "../core/forgot/forgot";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-redefine-pass',
  templateUrl: './redefine-senha.component.html',
  styleUrls: ['./redefine-senha.component.scss']
})
export class RedefineSenhaComponent implements OnInit {

  redefinePass: FormGroup;
  forgot = new Forgot();

  constructor(private redefineSenhaService: RedefineSenhaService, private route: ActivatedRoute) {
    this.redefinePass = new FormGroup({
      senha: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.route.params.subscribe( res => {
      console.log(res);
    });
  }

  update() {
    this.redefineSenhaService.update(this.redefinePass.value).subscribe( res => {
      this.forgot.usuario.senha = this.redefinePass.value.log
    });
  }

}
