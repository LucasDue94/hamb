import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AgendaService} from "../../core/agenda/agenda.service";
import {Router} from "@angular/router";
import {Agenda} from "../../core/agenda/agenda";

@Component({
  selector: 'agenda-show',
  templateUrl: './agenda-show.component.html',
  styleUrls: ['./agenda-show.component.scss']
})
export class AgendaShowComponent implements OnInit {

  @ViewChild("btnDisabled", {static: false}) btnDisabled: ElementRef;
  @ViewChild("btnEnabled", {static: false}) btnEnabled: ElementRef;
  @ViewChild("pacientesTable", {static: false}) pacientesTable: ElementRef;

  agenda;
  agendaAuxiliar: any[] = [];
  agendaCompleta: any[] = [];
  agendaManha: any[] = [];
  agendaTarde: any[] = [];
  route;


  constructor(private agendaService: AgendaService, private render: Renderer2, private router: Router) {
  }

  ngOnInit() {
     this.getRoute();
    console.log(this.agenda);
  }

  getRoute() {
    this.router.config.forEach(r => {
      if (r.path == 'agenda') {
        r.children.forEach(child => {
          if (child.path === 'show') {
            const r = child.data;
            this.agenda = r.data.agenda;
          }
        })
      }
    });
  }

  getMes() {
    return Agenda.getMes();
  }

  toogleColorBtn(e) {
    let status = e.target.innerText;
    if (e.type == 'click') {
      this.btnDisabled.nativeElement.classList.forEach(className => {
        if (className != 'btn-active' && status == 'Tarde') {
          this.btnDisabled.nativeElement.classList.add('btn-active');
          this.btnEnabled.nativeElement.classList.remove('btn-active');
        } else if (className != 'btn-active' && status == 'Manhã') {
          this.btnEnabled.nativeElement.classList.add('btn-active');
          this.btnDisabled.nativeElement.classList.remove('btn-active');
        }
      });

      if (status == 'Manhã') {
        this.agendaAuxiliar = this.agendaManha;
      } else if (status == 'Tarde') {
        this.agendaAuxiliar = this.agendaTarde;
      }
    }
  }
}
