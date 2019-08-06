import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('password', {static: false}) password;
  visible = false;
  loginForm: FormGroup;
  user = {
    login: '',
    senha: ''
  };

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  showPass() {
    this.visible = !this.visible;
    if (this.visible) {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
  }

  login() {
    this.user.login = this.loginForm.get('login').value;
    this.user.senha = this.loginForm.get('senha').value;

    this.authService.authentication(this.user).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('access_token')) {
        localStorage.setItem('token', res['access_token']);
        localStorage.setItem('username', res['username']);
        localStorage.setItem('roles', res['roles']);
      }
      console.log(localStorage);

      this.router.navigate(['/index'])
    },
      error => {
        console.log('deu bom nãi')
      });
  }

}
