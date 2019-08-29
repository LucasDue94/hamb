import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AgendaService} from "../../core/agenda/agenda.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Agenda} from "../../core/agenda/agenda";
import {NgxSpinnerService} from "ngx-spinner";
import {PacienteAgendado} from "../../core/pacienteAgendado/pacienteAgendado";
import {PacienteAgendadoService} from "../../core/pacienteAgendado/pacienteAgendado.service";
import {hasOwnProperty} from "tslint/lib/utils";

@Component({
  selector: 'agenda-show',
  templateUrl: './agenda-show.component.html',
  styleUrls: ['./agenda-show.component.scss']
})
export class AgendaShowComponent implements OnInit {

  @ViewChild('btnManha', {static: false}) btnManha;
  @ViewChild('btnTarde', {static: false}) btnTarde;
  agendas: Map<string, Agenda>;
  pacientes: PacienteAgendado[];
  hourMin;
  hourMax;
  dataAgenda;
  horario = '';

  constructor(private agendaService: AgendaService, private render: Renderer2,
              private router: Router, private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private pacienteAgendadoService: PacienteAgendadoService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((res) => {
      this.dataAgenda = res.data;
      this.agendaService.list('', '', this.dataAgenda).subscribe(agendas => {
        this.agendas = Agenda.mergeAgenda(agendas);
        if (this.agendas.size == 0) this.router.navigate(['/agenda', 'list']);
        this.pacientes = this.getPacientes();
        this.pacientes.sort(function (a, b) {
          if (a.nome > b.nome) return 1;
          if (a.nome < b.nome) return -1;
        });
        this.spinner.hide();
        this.verificaAgenda()
      })
    });
  }

  verificaAgenda() {
    let now = new Date();
    if (this.getHour(now) > 11) {
      this.setHorario('tarde');
      this.toogle(this.btnTarde);
      if (this.countPacientes() == 0) {
        this.setHorario('manhã');
        this.toogle(this.btnManha);
      }
    } else if (this.getHour(now) <= 11) {
      this.setHorario('manhã');
      this.toogle(this.btnManha);
      if (this.countPacientes() == 0) {
        this.setHorario('tarde');
        this.toogle(this.btnTarde);
      }
    }
  }

  goAtendimento(paciente) {
      console.log(paciente);
    if (paciente.registro != undefined)
      this.router.navigate(['/atendimento', paciente.registro.id]);
    else {
      if(paciente.hasOwnProperty('registro'))
      this.router.navigate(['/atendimento', paciente.registro.paciente.atendimentos.getLastRegistro().id])
    }
  }

  getMes = () => Agenda.getMes();

  getDay = (data) => Agenda.getDay(data) + 1;

  getPacientes() {
    let keys = this.agendas.keys();
    if (this.agendas != undefined)
      return this.agendas.get(keys.next().value).pacientes;
  }

  getIdade(stringData) {
    if (stringData == undefined) return '--';
    const nascimento = new Date(stringData);
    const idade = Agenda.getIdade(nascimento);
    return idade > 1 ? idade + ' anos' : idade + 'ano';
  }

  getHour = (stringData) => Agenda.getHour(stringData);

  toogle(button) {
    if (button == this.btnManha) {
      this.render.addClass(this.btnManha.nativeElement, 'btn-active');
      this.render.removeClass(this.btnTarde.nativeElement, 'btn-active');
    } else if (button == this.btnTarde) {
      this.render.addClass(this.btnTarde.nativeElement, 'btn-active');
      this.render.removeClass(this.btnManha.nativeElement, 'btn-active');
    }
  }

  setIntervalo() {
    if (this.horario == "manhã") {
      this.hourMin = 0;
      this.hourMax = 11;
    } else if (this.horario == 'tarde') {
      this.hourMin = 11;
      this.hourMax = 23;
    }
  }

  countPacientes(): number {
    let total = 0;
    if (this.pacientes != undefined) {
      this.pacientes.forEach(paciente => {
        let hora = this.getHour(paciente.hora);
        if (hora > this.hourMin && hora < this.hourMax) {
          total++;
        }
      });
      return total;
    }
  }

  setHorario(horario) {
    this.horario = horario;
    this.setIntervalo();
    if (this.horario == 'manhã') this.toogle(this.btnManha);
    else if (this.horario == 'tarde') this.toogle(this.btnTarde)
  }

  wasAtendido(paciente: PacienteAgendado) {
    if (paciente.registro != undefined && paciente.registro.atendimentos != undefined) {
      return paciente.registro.atendimentos.length > 0
    }
  }
}
