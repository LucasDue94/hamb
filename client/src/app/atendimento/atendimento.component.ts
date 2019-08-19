import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";
import {ActivatedRoute, Params} from "@angular/router";
import {RegistroAtendimento} from "../core/registroAtendimento/registroAtendimento";
import {Usuario} from "../core/usuario/usuario";

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  cids: Cid[];
  pacientes: Paciente[];
  atendimentos: Atendimento[];
  cid = new Cid({diagnostico: 'CID', id: null});
  paciente: Paciente;
  activeSearch = false;
  conteudo;

  constructor(private render: Renderer2,
              private cidService: CidService,
              private pacienteService: PacienteService,
              private atendimentoService: AtendimentoService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.pacienteService.get(params['id']).subscribe(paciente => this.paciente = paciente);
    });

    this.cidService.list('', '').subscribe(cids => {
      this.cids = cids;
    });

    this.atendimentoService.list('', '', localStorage.getItem('crm')).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
    });
  }


  dateToString(stringData) {
    let data = new Date(stringData);
    let dataFormatada = data.toISOString().substring(0, 10);
    let horaFormatada = data.toISOString().substring(11, 16);
    return dataFormatada.replace(/-/g, "/") + ' ' + horaFormatada;
  }

  selectCid(event) {
    console.log(event);
    this.activeSearch = false;
    this.cid.id = event.id;
    this.cutString(event.diagnostico)
  }

  search() {
    this.activeSearch = !this.activeSearch;
  }

  validate() {
  }

  setFields() {
    const novoAtendimento = new Atendimento({
      usuario: new Usuario(),
      registroAtendimento: new RegistroAtendimento(),
      date: new Date(),
      cid: this.cid,
      conteudo: this.conteudo
    })
  }

  save() {
    this.validate();
    this.setFields();
  }

  cutString(longString) {
    this.cid.diagnostico = longString.substring(0, 20);
    if (longString.length > 20) {
      this.cid.diagnostico = this.cid.diagnostico.concat('...');
    }
  }
}
