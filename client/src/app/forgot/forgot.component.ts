import {Component, HostListener, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ForgotService} from "../core/forgot/forgot.service";
import {AlertService} from "../core/alert/alert.service";
import {ErrorService} from "../core/error/error.service";
import {Router} from "@angular/router";

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
    this.forgotService.save(this.forgot.value).subscribe(res => {
      if (this.errorService.hasError(res)) {
        this.alertService.send({
          message: 'Desculpe... não encontramos este e-mail.',
          type: 'error',
          icon: 'sad-tear'
        });
      } else {
        this.router.navigate(['/']);
        this.alertService.send({
          message: 'Email enviado.',
          type: 'success',
          icon: 'check'
        });
      }
    });
  }
}
