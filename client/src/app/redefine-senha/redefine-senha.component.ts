import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Forgot} from "../core/forgot/forgot";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {ForgotService} from "../core/forgot/forgot.service";
import {ErrorService} from "../core/error/error.service";
import {AlertService} from "../core/alert/alert.service";

@Component({
  selector: 'redefine-senha',
  templateUrl: './redefine-senha.component.html',
  styleUrls: ['./redefine-senha.component.scss']
})
export class RedefineSenhaComponent implements OnInit {
  @ViewChild('password', {static: false}) password;
  @ViewChild('confirmPassword', {static: false}) confirmPassword;
  @ViewChild('errorContainer', {static: false}) errorContainer;
  visible = false;
  form: FormGroup;
  forgot = new Forgot();
  capsOn = false;
  forgotId;
  hash: string;
  error = false;


  constructor(private route: ActivatedRoute, private forgotService: ForgotService,
              private errorService: ErrorService, private alertService: AlertService,
              private router: Router, private render: Renderer2) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      confirmacaoSenha: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required)
    });
    this.forgot.usuario = new Usuario({senha: this.form.controls['senha'].value});
    this.route.params.subscribe(res => console.log(res));
    this.hash = this.route.snapshot.paramMap.get('hash');
    this.forgotId = +this.route.snapshot.paramMap.get('id');
    this.form.controls['token'].setValue(this.hash);
    this.form.controls['id'].setValue(this.forgotId);
  }

  getParams() {
    this.forgot.token = this.form.controls['token'].value;
    this.forgot.id = this.form.controls['id'].value;
    this.forgot.usuario.senha = this.form.controls['senha'].value;
    return this.forgot;
  }

  @HostListener('window:keyup', ['$event']) keyEnterEvent(event: KeyboardEvent) {
    if (event.key == "Enter") {
      this.update();
    }
  }

  @HostListener('window:keyup', ['$event']) keyCapsLock(event: KeyboardEvent) {
    if (event.key == 'CapsLock') {
      this.capsOn = !this.capsOn;
      console.log(this.capsOn)
    }
  }

  showError(){
    this.render.removeClass(this.errorContainer.nativeElement,'valid');
    this.render.addClass(this.errorContainer.nativeElement,'invalid');
  }

  hideError(){
   this.render.removeClass(this.errorContainer.nativeElement,'invalid');
   this.render.addClass(this.errorContainer.nativeElement,'valid');
  }

  update() {
    this.hideError()
    if (this.checkPass()) {
      this.forgotService.save(this.getParams()).subscribe(res => {
        if (this.errorService.hasError(res)) {
          this.alertService.send({
            message: 'Não foi possível redefinir sua senha',
            type: 'error',
            icon: 'sad-tear'
          });
        } else {
          this.alertService.send({
            message: 'Sua senha foi alterada!',
            type: 'success',
            icon: 'check'
          });
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000)
        }
      });
    } else {
      this.showError();
      setTimeout(()=>{
        this.hideError()
      },2000);
    }
  }

  checkPass = () => this.form.controls['senha'].value === this.form.controls['confirmacaoSenha'].value;


  showPass() {
    this.visible = !this.visible;
    if (this.visible) {
      this.password.nativeElement.type = 'text';
      this.confirmPassword.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
      this.confirmPassword.nativeElement.type = 'password';
    }
  }
}
