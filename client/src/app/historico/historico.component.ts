import {Component, OnInit, Renderer2} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";

@Component({
  selector: 'historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  cids: Cid[];
  pacientes: Paciente[];
  atendimentos: Atendimento[];

  constructor(private render: Renderer2,
              private cidsService: CidService,
              private pacientesService: PacienteService,
              private atendimentoService: AtendimentoService) {
  }

  ngOnInit() {
    this.cidsService.list().subscribe(cids => {
      this.cids = cids;
    });

    this.pacientesService.list().subscribe(pacientes => {
      this.pacientes = pacientes;
    });

    this.atendimentoService.list().subscribe(atendimentos => {
      this.atendimentos = atendimentos;
    });
  }


  public collapse(e) {
    document.addEventListener("click", (evt) => {
      const elementCliked = e.target;
      const element = e.target.nextElementSibling;
      let targetElement = evt.target;

      do {
        if (targetElement == elementCliked || targetElement == element) {
          this.render.setStyle(element, 'display', 'block');
          return;
        }
        targetElement = targetElement.parentNode;
      } while (targetElement);
      this.render.setStyle(element, 'display', 'none');
    });
  }

}
