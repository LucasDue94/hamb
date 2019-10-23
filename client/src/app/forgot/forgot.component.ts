import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotService} from "../core/forgot/forgot.service";
import {AlertService} from "../core/alert/alert.service";
import {ErrorService} from "../core/error/error.service";
import {Router} from "@angular/router";
import {Alert} from "../core/alert/alert";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgot: FormGroup;

  constructor(private forgotService: ForgotService, private alertService: AlertService,
              private errorService: ErrorService, private router: Router) {
  }

  ngOnInit() {
    this.forgot = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    if (event.key == "Enter") this.save();
  }

  save() {
    if (this.forgot.controls['email'].value != '') {
      this.forgotService.save(this.forgot.value).subscribe(res => {
        if (this.errorService.hasError(res)) {
          if (res.error.status == 403) {
            this.alertService.send({
              message: 'Verifique sua caixa de e-mail.',
              type: 'warning',
              icon: 'info-circle'
            });
          } else {
            this.alertService.send({
              message: 'Desculpe... não encontramos este e-mail.',
              type: 'error',
              icon: 'sad-tear'
            });
          }
        } else {
          this.router.navigate(['/']);
          this.alertService.send({
            message: 'Email enviado.',
            type: 'success',
            icon: 'check'
          });
        }
      });
    } else {
      this.alertService.send({
        message: 'O e-mail não pode ser vazio.',
        type: 'error',
        icon: 'frown'
      });
    }
  }
}
