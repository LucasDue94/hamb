import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/auth/auth.service";
import {Router} from "@angular/router";
import {Agenda} from "../core/agenda/agenda";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('password', {static: false}) password;
  @Output() getData: EventEmitter<any> = new EventEmitter();
  visible = false;
  loginForm: FormGroup;
  error = false;
  currentUser;
  messageError = '';
  authUser = {
    login: '',
    senha: '',
  };

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event']) keyEnterEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.login();
    }
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
    this.error = false;
    this.authUser.login = this.loginForm.get('login').value;
    this.authUser.senha = this.loginForm.get('senha').value;
    if (!this.loginForm.invalid) {
      this.authService.authentication(this.authUser).subscribe(res => {
          this.currentUser = res;
          if (res.hasOwnProperty('access_token')) {
            localStorage.setItem('id', res['id']);
            localStorage.setItem('nome', res['nome']);
            localStorage.setItem('login', res['login']);
            localStorage.setItem('crm', res['crm']);
            localStorage.setItem('token', res['access_token']);
            localStorage.setItem('perfil', res['perfil']);
            localStorage.setItem('roles', res['roles']);
          }
          if (this.currentUser.crm == null) {
            this.router.navigate(['/usuario']);
          } else {
            this.router.navigate(['/agenda', 'show', Agenda.getStringDate(), this.currentUser.id]);
          }
        },
        error => {
          this.error = true;
          this.messageError = 'Usuário ou senha iválida!';
        });
    } else {
      this.error = true;
      this.messageError = 'Preencha o login e a senha!';
    }
  }
}
