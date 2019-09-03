import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {Location} from '@angular/common';

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agendas: Map<string, Agenda>;
  dias;
  spinner = false;
  usuarioLogado: Usuario;

  constructor(private render: Renderer2, private agendaService: AgendaService,
              private router: Router, private route: ActivatedRoute, private location: Location) {
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
  }

  ngOnInit() {
    this.loading();
  }

  ngAfterViewInit(): void {
    if (Usuario.isMedico(this.usuarioLogado.crm)) {
      this.agendaService.list().subscribe((agendas) => {
        this.agendas = Agenda.mergeAgenda(agendas);
        this.dias = Array.from(this.agendas.keys());
        this.loaded();
      });
    } else {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.agendaService.list('', '', '', params['id']).subscribe((agendas) => {
          this.agendas = Agenda.mergeAgenda(agendas);
          this.dias = Array.from(this.agendas.keys());
          this.loaded();
        });
      });
    }
  }

  back = () => this.router.navigate(['/usuario','list']);

  isMedico = (crm) => Usuario.isMedico(crm);

  dateToString(key) {
    let agenda = new Agenda(this.agendas.get(key));
    let dateUTC = new Date(Date.parse(agenda.dataHora));
    return Agenda.getStringDate(dateUTC);
  }

  send(key) {
    if (Usuario.isMedico(this.usuarioLogado.crm)) {
      this.router.navigate(['/agenda', 'show', this.dateToString(key), this.usuarioLogado.id]);
    } else {
      this.route.params.subscribe(params => {
        console.log(params);
        this.router.navigate(['/agenda', 'show', this.dateToString(key), params['id']]);
      })

    }
  }

  getToday = () => Agenda.getDay();

  getMes = () => Agenda.getMes();

  countEfetivados(dia) {
    return Agenda.countEfetivados(this.agendas.get(dia).pacientes);
  }

  countAgendados(dia) {
    return this.agendas.get(dia).pacientes.length;
  }

  countAtendidos(dia) {
    let total = 0;
    let pacientesAgendados = this.agendas.get(dia).pacientes;
    pacientesAgendados.forEach(paciente => {
      if (paciente.registro != undefined && paciente.registro.atendimentos != undefined) {
        if (paciente.registro.atendimentos.length > 0) {
          total++;
        }
      }
    });
    return total;
  }

  loading = () => this.spinner = true;
  loaded = () => this.spinner = false;
}


