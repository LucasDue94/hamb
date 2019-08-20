import {Component, OnInit, Renderer2} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {NgxSpinnerService} from "ngx-spinner";
import {RegistroAtendimento} from "../core/registroAtendimento/registroAtendimento";

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  cids: Cid[];
  pacientes: Paciente[];
  atendimentos: Atendimento[];
  paciente: Paciente;
  registro;
  dataAgenda;
  cid: Cid;
  activeSearch = false;
  usuarioLogado;
  conteudo;

  constructor(private render: Renderer2, private cidService: CidService,
              private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit() {
    this.cid = new Cid({diagnostico: 'CID', id: null});
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});

    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.pacienteService.get(params['id']).subscribe(paciente => this.paciente = paciente);
    });

    this.cidService.list('', '').subscribe(cids => {
      this.cids = cids;
    });

    this.atendimentoService.list('', '', localStorage.getItem('crm')).subscribe(atendimentos => {
      this.atendimentos = atendimentos;
      console.log(atendimentos);
      this.spinner.hide();
    });
    this.receiveData()
  }

  receiveData() {
    const r = this.router.config.find(r => r.path == 'atendimento/:id');
    this.dataAgenda = r.data['data'];
    this.registro = r.data['registro'];
    console.log(this.registro)
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


  setFields() {
    console.log(this.registro);
    let atendimento = new Atendimento();
    atendimento.usuario = this.usuarioLogado;
    atendimento.conteudo = this.conteudo;
    atendimento.registroAtendimento = new RegistroAtendimento({id: this.registro});
    atendimento.cid = new Cid({id: this.cid.id});
    this.deleteProperties(atendimento.cid);
    this.deleteProperties(atendimento.usuario);
    delete atendimento.dataAtendimento;
    console.log(atendimento);
    this.atendimentoService.save(atendimento).subscribe(res => {
      if (res.status == 201){
        this.spinner.show()
        this.atendimentoService.list('', '', localStorage.getItem('crm')).subscribe(atendimentos => {
          this.atendimentos = atendimentos;
          this.spinner.hide();
        });
      }

    });
  }

  deleteProperties(obj) {
    for (let key in obj) {
      if (key != 'id') {
        delete obj[key];
      }
    }
  }

  save() {
    this.setFields();
  }

  cutString(longString) {
    this.cid.diagnostico = longString.substring(0, 20);
    if (longString.length > 20) {
      this.cid.diagnostico = this.cid.diagnostico.concat('...');
    }
  }
}
