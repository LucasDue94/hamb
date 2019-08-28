import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {NgxSpinnerService} from "ngx-spinner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {PacienteAgendadoService} from "../core/pacienteAgendado/pacienteAgendado.service";
import {PacienteAgendado} from "../core/pacienteAgendado/pacienteAgendado";
import {RegistroAtendimento} from "../core/registroAtendimento/registroAtendimento";
import {PacienteInfoComponent} from "../paciente-info/paciente-info.component";

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  @ViewChild('conteudo', {static: false}) conteudo;
  @ViewChild('cid', {static: false}) cid;
  atendimentos: Atendimento[];
  paciente: Paciente;
  pacienteAgendado: PacienteAgendado;
  dataAgenda;
  usuarioLogado;
  activeSearch = false;
  isValidForm = null;
  //TODO fazer o offset
  max = 1000;
  static REGISTRO_LENGTH = 7;
  static PRONTUARIO_LENGTH = 9;
  showCard = false;
  atendimentoForm: FormGroup;

  constructor(private render: Renderer2, private cidService: CidService,
              private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private pacienteAgendadoService: PacienteAgendadoService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private router: Router,
              private location: Location) {
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
  }

  ngOnInit() {
    this.buildForm();
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id.length == AtendimentoComponent.PRONTUARIO_LENGTH) {
        this.pacienteService.get(id).subscribe(paciente => {
          this.paciente = paciente;
          this.getAtendimentos();
        })
      } else if (id.length == AtendimentoComponent.REGISTRO_LENGTH) {
        this.pacienteAgendadoService.get(id).subscribe(pacienteAgendado => {
          this.pacienteAgendado = pacienteAgendado;
          this.pacienteService.get(this.pacienteAgendado.registro.paciente.id).subscribe(paciente => {
            this.paciente = paciente;
            this.getAtendimentos();
          })
        });
      }
    });
  }

  getAtendimentos = () => this.atendimentoService.list(this.max, '', this.paciente.id).subscribe(atendimentos => {
    this.atendimentos = atendimentos;
    this.spinner.hide();
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

  dateToString(stringData) {
    let data = new Date(stringData);
    let dataFormatada = data.toISOString().substring(0, 10);
    let horaFormatada = data.toISOString().substring(11, 16);
    return dataFormatada.replace(/-/g, "/") + ' ' + horaFormatada;
  }

  selectCid(event) {
    this.activeSearch = false;
    this.atendimentoForm.get('cid').get('id').setValue(event.id);
    this.cutString(event.diagnostico);
    this.render.removeClass(this.cid.nativeElement, 'errors');
  }

  search() {
    this.activeSearch = !this.activeSearch;
  }

  setFields() {
    let atendimento = new Atendimento();
    atendimento.usuario = this.usuarioLogado;
    atendimento.conteudo = this.atendimentoForm.get('conteudo').value;
    atendimento.registroAtendimento = new RegistroAtendimento({id: this.pacienteAgendado.registro.id});
    atendimento.paciente = new Paciente({id: this.paciente.id});
    atendimento.cid = new Cid({
      id: this.atendimentoForm.get('cid').get('id').value,
      diagnostico: this.atendimentoForm.get('cid').get('diagnostico').value
    });
    delete atendimento.cid.diagnostico;
    return atendimento;
  }

  updateConteudo() {
    if (this.getControl('conteudo').value) this.render.removeClass(this.conteudo.nativeElement, 'errors');
  }

  updateAtendimentos() {
    this.atendimentoService.list('', '', this.paciente.id).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
      this.spinner.hide();
    });
    const r = this.router.config.find(r => r.path == 'atendimento/:id');
    r.data = {registro: this.paciente.id};
  }

  checkField = (field) => field != null && field != '' && field != undefined;

  validate = (atendimento: Atendimento) => this.checkField(atendimento.usuario.id) &&
    this.atendimentoForm.valid && this.checkField(atendimento.registroAtendimento) &&
    this.checkField(atendimento.paciente.id);

  save() {
    const atendimento = this.setFields();
    this.isValidForm = this.validate(atendimento);
    if (this.isValidForm) {
      this.render.removeClass(this.cid.nativeElement, 'errors');
      this.render.removeClass(this.conteudo.nativeElement, 'errors');
      this.atendimentoService.save(atendimento).subscribe(res => {
        if (res.status == 201) {
          this.spinner.show();
          this.updateAtendimentos();
        }
      });
    } else {
      if (this.getControl('conteudo').invalid) {
        this.render.addClass(this.conteudo.nativeElement, 'errors');
      }
      if (this.getControl('id').invalid) {
        this.render.addClass(this.cid.nativeElement, 'errors');
      }
    }
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

  toggle() {
    this.showCard = !this.showCard;
  }
}
