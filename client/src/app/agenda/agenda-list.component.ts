import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {AgendaService} from "../core/agenda/agenda.service";
import {Agenda} from "../core/agenda/agenda";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";
import {SpinnerService} from "../core/spinner/spinner.service";
import {ErrorService} from "../core/error/error.service";

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit, AfterViewInit {

  agendas: Map<string, Agenda>;
  usuarioLogado: Usuario;
  dias;

  constructor(private render: Renderer2, private agendaService: AgendaService,
              private router: Router, private route: ActivatedRoute,
              private spinnerService: SpinnerService, private errorService: ErrorService) {
    this.usuarioLogado = new Usuario({id: localStorage.id, crm: localStorage.crm, nome: localStorage.nome});
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  ngAfterViewInit(): void {
    if (Usuario.isMedico(this.usuarioLogado.crm)) {
      this.agendaService.list().subscribe((agendas) => {
        if (this.errorService.hasError(agendas)) this.errorService.sendError(agendas);
        this.agendas = Agenda.mergeAgenda(agendas);
        this.dias = Array.from(this.agendas.keys());
        this.spinnerService.hide()
      });
    } else {
      this.route.params.subscribe((params: Params) => {
        this.agendaService.list('', '', '', params['id']).subscribe((agendas) => {
          if (this.errorService.hasError(agendas)) this.errorService.sendError(agendas);
          this.agendas = Agenda.mergeAgenda(agendas);
          this.dias = Array.from(this.agendas.keys());
          this.spinnerService.hide();
        });
      });
    }
  }

  back = () => this.router.navigate(['/usuario', 'list']);

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
        this.router.navigate(['/agenda', 'show', this.dateToString(key), params['id']]);
      })
    }
  }

  getToday = () => Agenda.getDay();

  getMes = () => Agenda.getMes();
}


