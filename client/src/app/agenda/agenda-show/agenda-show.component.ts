import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AgendaService} from "../../core/agenda/agenda.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  agendas;
  dataAgenda;


  constructor(private agendaService: AgendaService, private render: Renderer2, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.dataAgenda = res.data;
      this.agendaService.list(res.data).subscribe(value => {console.log(value)})
    });
  }

  getMes() {
    return Agenda.getMes();
  }
}
