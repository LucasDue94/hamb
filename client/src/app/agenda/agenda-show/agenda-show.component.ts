import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AgendaService} from "../../core/agenda/agenda.service";

@Component({
  selector: 'agenda-show',
  templateUrl: './agenda-show.component.html',
  styleUrls: ['./agenda-show.component.scss']
})
export class AgendaShowComponent implements OnInit {

  @ViewChild("btnDisabled", {static: false}) btnDisabled: ElementRef;
  @ViewChild("btnEnabled", {static: false}) btnEnabled: ElementRef;
  @ViewChild("pacientesTable", {static: false}) pacientesTable: ElementRef;

  agendaAuxiliar: any[] = [];
  agendaCompleta: any[] = [];
  agendaManha: any[] = [];
  agendaTarde: any[] = [];

  constructor(private agendaService: AgendaService, private render: Renderer2) {
  }

  ngOnInit() {
    this.agendaCompleta = this.agendaService.list();
    this.agendaCompleta.forEach(agenda => {
      if (agenda.periodo == 'manhã') {
        this.agendaManha.push(agenda);
        this.agendaAuxiliar = this.agendaManha;
      } else {
        this.agendaTarde.push(agenda);
        this.agendaAuxiliar = this.agendaTarde;
      }
    });
    this.agendaAuxiliar = this.agendaManha;
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
