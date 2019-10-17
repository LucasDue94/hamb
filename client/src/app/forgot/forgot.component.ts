import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotService} from "../core/forgot/forgot.service";
import {Forgot} from "../core/forgot/forgot";
import {RedefineSenhaService} from "../core/redefineSenha/redefine-senha.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgot: FormGroup;
  usuario = new Forgot();

  constructor(private forgotService: ForgotService, private redefineSenhaService: RedefineSenhaService) {
    this.forgot = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  save() {
    this.forgotService.save(this.forgot.value).subscribe(res => {

    });
  }
}
