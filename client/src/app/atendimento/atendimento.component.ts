import {Component, DoCheck, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
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
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  atendimentos: Atendimento[];
  paciente: Paciente;
  registro;
  dataAgenda;
  usuarioLogado;
  activeSearch = false;
  isValidForm = null;
  atendimentoForm = new FormGroup({
    conteudo: new FormControl('', {
      updateOn: 'blur',
      validators: Validators.required,
    }),
    cid: new FormGroup({
      id: new FormControl('', [Validators.required]),
      diagnostico: new FormControl('CID', [Validators.required])
    })
  });

  constructor(private render: Renderer2, private cidService: CidService,
              private pacienteService: PacienteService, private atendimentoService: AtendimentoService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private router: Router) {
  }

  ngOnInit() {
    this.atendimentoForm.get('cid').get('diagnostico').reset('CID');
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
    this.receiveData();
    // this.spinner.show();

    this.route.params.subscribe((params: Params) => {
      this.pacienteService.get(params['id']).subscribe(paciente => {
        this.paciente = paciente;
        this.atendimentoService.list('', '', this.paciente.id).subscribe(atendimentos => {
          this.atendimentos = atendimentos;
          this.spinner.hide();
        });
      });
    });
    this.atendimentoForm.get('conteudo').valueChanges.subscribe(res => console.log(res));
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
    this.activeSearch = false;
    this.atendimentoForm.get('cid').get('id').setValue(event.id);
    this.cutString(event.diagnostico);
  }

  search() {
    this.activeSearch = !this.activeSearch;
  }

  setFields() {
    let atendimento = new Atendimento();
    atendimento.usuario = this.usuarioLogado;
    atendimento.conteudo = this.atendimentoForm.get('conteudo').value;
    atendimento.registroAtendimento = this.registro;
    atendimento.cid = new Cid({
      id: this.atendimentoForm.get('cid').get('id').value,
      diagnostico: this.atendimentoForm.get('cid').get('diagnostico').value
    });
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
    this.atendimentoForm.valid && this.checkField(atendimento.registroAtendimento);

  save() {
    const atendimento = this.setFields();
    this.isValidForm = this.validate(atendimento);
    if (this.isValidForm) {
      this.atendimentoService.save(atendimento).subscribe(res => {
        console.log(res);
        if (res.status == 201) {
          this.spinner.show();
          this.updateAtendimentos();
        }
      });
    }
  }

  getControl(string) {
    if(string=='conteudo') return this.atendimentoForm.get('conteudo');
    if(string=='diagnostico') return this.atendimentoForm.get('cid').get('diagnostico');
    if(string=='id') return this.atendimentoForm.get('cid').get('id')
  }

  cutString(longString) {
    let diagnostico = this.getControl('diagnostico');
    diagnostico.setValue(longString.substring(0, 20));
    if (longString.length > 20) {
      diagnostico.setValue(diagnostico.value.concat('...'));
    }
  }
}
