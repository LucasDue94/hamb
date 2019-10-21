import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  @ViewChild('errorContainer', {static: false}) errorContainer;
  visible = false;
  capsOn;
  numLock = true;
  loginForm;
  error = false;
  currentUser;
  messageError = '';
  authUser = {
    login: '',
    senha: '',
  };

  constructor(private authService: AuthService, private router: Router, private render: Renderer2) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }


  @HostListener('window:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
    this.capsOn = event.getModifierState('CapsLock');
    this.numLock = event.getModifierState('NumLock');
    if (event.key == "Enter") this.login();
  }


  showPass() {
    this.visible = !this.visible;
    this.password.nativeElement = this.visible ? 'text' : 'password';
  }


  showErrors() {
    this.render.removeClass(this.errorContainer.nativeElement, 'valid');
    this.render.addClass(this.errorContainer.nativeElement, 'invalid');
    setTimeout(() => {
      this.render.removeClass(this.errorContainer.nativeElement, 'invalid');
      this.render.addClass(this.errorContainer.nativeElement, 'valid');
    }, 2000);
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
          this.showErrors();
        });
    } else {
      this.error = true;
      this.messageError = 'Login e senha em branco!';
      this.showErrors()
    }
  }
}
