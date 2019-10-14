import {AfterViewChecked, Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {RegistroAtendimento} from "../core/registroAtendimento/registroAtendimento";
import {RegistroAtendimentoService} from "../core/registroAtendimento/registroAtendimento.service";
import {AlertService} from "../core/alert/alert.service";
import {SpinnerService} from "../core/spinner/spinner.service";

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit, AfterViewChecked {

  @ViewChild('conteudo', {static: false}) conteudo;
  @ViewChild('cid', {static: false}) cid;
  @ViewChild('atendimentoContainer', {static: false}) atendimentoContainer;
  @ViewChild('pacienteCard', {static: false}) pacienteCard;
  @ViewChild('status', {static: false}) status;
  atendimentos: Atendimento[];
  paciente: Paciente;
  atendimentoForm: FormGroup;
  usuarioLogado: Usuario;
  activeSearch = false;
  isValidForm = null;
  max = 10000;
  showCard = false;
  messageStatus;
  hasRegistro = true;

  constructor(private render: Renderer2, private cidService: CidService,
              private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private registroAtendimento: RegistroAtendimentoService, private alertService: AlertService,
              private route: ActivatedRoute, private spinnerService: SpinnerService, private router: Router,
              private location: Location) {
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
  }

  ngOnInit() {
    this.buildForm();
    this.spinnerService.show();
    this.route.params.subscribe((params: Params) => {
      const prontuario = params['id'];
      this.pacienteService.get(prontuario).subscribe(paciente => {
        this.paciente = paciente;
        this.getAtendimentos();
        this.spinnerService.hide()
      });
    });
  }

  ngAfterViewChecked(): void {
    if (this.atendimentoForm.disabled) this.messageStatus = 'Este paciente ainda não foi efetivado,ou seja, ele não possui registro';
    this.atendimentoContainer.nativeElement.scrollTop = this.atendimentoContainer.nativeElement.scrollHeight;
  }

  hasCrm = () => this.usuarioLogado.crm != 'null' && this.usuarioLogado.crm != null && this.usuarioLogado.crm != '';

  getAtendimentos = () => this.atendimentoService.list(this.max, '', this.paciente.id).subscribe(atendimentos => {
    this.atendimentos = atendimentos;
    this.spinnerService.hide();
  });

  buildForm() {
    this.atendimentoForm = new FormGroup({
      conteudo: new FormControl('', {
        updateOn: 'change',
        validators: Validators.required,
      }),
      cid: new FormGroup({
        id: new FormControl('', {
          validators: Validators.required,
          updateOn: 'change',
        }),
        diagnostico: new FormControl('CID', [Validators.required])
      })
    });
  }

  back = () => this.location.back();

  selectCid(event) {
    this.activeSearch = false;
    this.atendimentoForm.get('cid').get('id').setValue(event.id);
    this.cutString(event.diagnostico);
    this.render.removeClass(this.cid.nativeElement, 'errors');
  }

  searchCid() {
    this.activeSearch = !this.activeSearch;
  }

  setFields() {
    let atendimento = new Atendimento();
    atendimento.usuario = this.usuarioLogado;
    atendimento.conteudo = this.atendimentoForm.get('conteudo').value;
    atendimento.cid = new Cid({
      id: this.atendimentoForm.get('cid').get('id').value,
    });
    atendimento.registroAtendimento = new RegistroAtendimento({id: this.paciente.lastRegistro().id})
    return atendimento;
  }

  updateConteudo() {
    if (this.getControl('conteudo').value) {
      this.render.removeClass(this.conteudo.nativeElement, 'errors');
      this.render.removeClass(this.conteudo.nativeElement, 'historico-errors');
    }
  }

  updateAtendimentos() {
    this.atendimentoService.list('', '', this.paciente.id).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
      this.spinnerService.hide();
      this.clear()
    });
    const r = this.router.config.find(r => r.path == 'atendimento/:id');
    if (r != undefined) r.data = {registro: this.paciente.id};
  }

  checkField = (field) => field != null && field != '' && field != undefined;

  validate = (atendimento: Atendimento) => this.checkField(atendimento.usuario.id) &&
    this.atendimentoForm.valid && this.checkField(atendimento.registroAtendimento);

  clear() {
    this.atendimentoForm.reset();
    this.getControl('diagnostico').reset('CID');
  }

  formatText(conteudo) {
    return conteudo.replace(/\n/g || /\r\n/g || /\r/g, '<br>');
  }

  save() {
    const atendimento = this.setFields();
    this.isValidForm = this.validate(atendimento);
    if (this.isValidForm) {
      this.removeErrors();
      this.atendimentoService.save(atendimento).subscribe(res => {
        if (res.status == 201) {
          this.spinnerService.show();
          this.updateAtendimentos();
            this.spinnerService.hide();
          this.alertService.send({message: 'O histórico foi atualizado', icon: 'check', type: 'success'});
            this.location.back();
        }
      });
    } else {
      this.showErrors();
    }
  }

  showErrors() {
    if (this.getControl('conteudo').invalid) this.render.addClass(this.conteudo.nativeElement, 'errors');
    if (this.getControl('conteudo').invalid) this.render.addClass(this.conteudo.nativeElement, 'historico-errors');
    if (this.getControl('id').invalid) this.render.addClass(this.cid.nativeElement, 'errors');
  }

  removeErrors() {
    this.render.removeClass(this.cid.nativeElement, 'errors');
    this.render.removeClass(this.conteudo.nativeElement, 'errors');
    this.render.removeClass(this.conteudo.nativeElement, 'historico-errors');
  }

  getControl(string) {
    if (string == 'conteudo') return this.atendimentoForm.get('conteudo');
    if (string == 'diagnostico') return this.atendimentoForm.get('cid').get('diagnostico');
    if (string == 'id') return this.atendimentoForm.get('cid').get('id')
  }

  cutString(longString) {
    let diagnostico = this.getControl('diagnostico');
    diagnostico.setValue(longString.substring(0, 20));
    if (longString.length > 20) {
      diagnostico.setValue(diagnostico.value.concat('...'));
    }
  }

  toggle = (status) => this.showCard = status;
}
