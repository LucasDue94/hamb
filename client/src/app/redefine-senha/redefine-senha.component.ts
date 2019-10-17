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
  hash: string;
  forgotId: number;

  constructor(private redefineSenhaService: RedefineSenhaService, private route: ActivatedRoute) {
    this.redefinePass = new FormGroup({
      id: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required)
    });

    this.forgot.usuario.senha = this.redefinePass.controls['senha'].value;

  }

  ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get('hash');
    this.forgotId = +this.route.snapshot.paramMap.get('id');
    this.redefinePass.controls['token'].setValue(this.hash);
    this.redefinePass.controls['id'].setValue(this.forgotId);
  }

  getParams() {
    this.forgot.token = this.redefinePass.controls['token'].value;
    this.forgot.id = this.redefinePass.controls['id'].value;
    this.forgot.usuario.senha = this.redefinePass.controls['senha'].value;
    return this.forgot;
  }

  update() {
    this.redefineSenhaService.update(this.getParams()).subscribe();
  }

}
