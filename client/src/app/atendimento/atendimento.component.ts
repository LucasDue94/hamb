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

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  @ViewChild('cidContainer', {static: false}) cidContainer;
  atendimentos: Atendimento[];
  paciente: Paciente;
  registro;
  dataAgenda;
  cid: Cid;
  usuarioLogado;
  conteudo;
  activeSearch = false;
  isValidForm = null;
  controls;

  constructor(private render: Renderer2, private cidService: CidService,
              private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit() {
    this.controls = new Object({
      conteudo: false,
      cid: false
    });
    this.cid = new Cid({diagnostico: 'CID', id: ''});
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
    this.receiveData();
    this.spinner.show();

    this.route.params.subscribe((params: Params) => {
      this.pacienteService.get(params['id']).subscribe(paciente => {
        this.paciente = paciente;
        this.atendimentoService.list('', '', this.paciente.id).subscribe(atendimentos => {
          this.atendimentos = atendimentos;
          this.spinner.hide();
        });
      });
    });
  }

  receiveData() {
    const r = this.router.config.find(r => r.path == 'atendimento/:id');
    this.dataAgenda = r.data['dataAgenda'];
    this.registro = r.data['registro'];
  }

  dateToString(stringData) {
    let data = new Date(stringData);
    let dataFormatada = data.toISOString().substring(0, 10);
    let horaFormatada = data.toISOString().substring(11, 16);
    return dataFormatada.replace(/-/g, "/") + ' ' + horaFormatada;
  }

  selectCid(event) {
    this.render.removeClass(this.cidContainer.nativeElement, 'invalid-cid');
    this.activeSearch = false;
    this.cid.id = event.id;
    console.log(this.cid);
    this.cutString(event.diagnostico)
  }

  search() {
    this.activeSearch = !this.activeSearch;
  }

  setFields() {
    let atendimento = new Atendimento();
    atendimento.usuario = this.usuarioLogado;
    atendimento.conteudo = this.conteudo;
    atendimento.registroAtendimento = this.registro;
    atendimento.cid = this.cid;
    delete atendimento.cid.diagnostico;
    return atendimento;
  }

  updateAtendimentos() {
    this.atendimentoService.list('', '', this.paciente.id).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
      this.spinner.hide();
    });
    const r = this.router.config.find(r => r.path == 'atendimento/:id');
    r.data = {registro: this.paciente.id, dataAgenda: this.dataAgenda};
  }

  checkField = (field) => field != null && field != '' && field != undefined;

  validate = (atendimento: Atendimento) => this.checkField(atendimento.usuario.id) &&
    this.checkField(atendimento.conteudo) && this.checkField(atendimento.registroAtendimento) &&
    this.checkField(atendimento.cid.id);

  setErros(atendimento) {
    if (!this.checkField(atendimento.conteudo)) {

    }

    if (!this.checkField(atendimento.cid.id)) {

    }
  }

  save() {
    const atendimento = this.setFields();
    this.isValidForm = this.validate(atendimento);
    if (this.isValidForm) {
      this.render.removeClass(this.cidContainer.nativeElement, 'invalid-cid');
      this.atendimentoService.save(atendimento).subscribe(res => {
        if (res.status == 201) {
          this.spinner.show();
          this.updateAtendimentos();
        }
      });
    } else {
      this.setErros(atendimento)

    }
  }

  cutString(longString) {
    this.cid.diagnostico = longString.substring(0, 20);
    if (longString.length > 20) {
      this.cid.diagnostico = this.cid.diagnostico.concat('...');
    }
  }
}
