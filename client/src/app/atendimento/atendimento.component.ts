import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Cid} from "../core/cid/cid";
import {CidService} from "../core/cid/cid.service";
import {Paciente} from "../core/paciente/paciente";
import {PacienteService} from "../core/paciente/paciente.service";
import {AtendimentoService} from "../core/atendimento/atendimento.service";
import {Atendimento} from "../core/atendimento/atendimento";
import {ActivatedRoute, Params} from "@angular/router";
import {Usuario} from "../core/usuario/usuario";

@Component({
  selector: 'historico',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  cids: Cid[];
  pacientes: Paciente[];
  atendimentos: Atendimento[];
  codPrt;


  showInfoCard = false;
  @ViewChild('infoCard', {static: false}) infoCard;

  constructor(private render: Renderer2,
              private cidsService: CidService,
              private pacienteService: PacienteService,
              private atendimentoService: AtendimentoService,
              private route: ActivatedRoute) {
    this.removeInfoCard = this.removeInfoCard.bind(this);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.codPrt = params['id'];
    });
    this.pacienteService.get(this.codPrt).subscribe(res => console.log(res));

    /*  this.cidsService.list().subscribe(cids => {
        this.cids = cids;
      });
  */
    /*  this.atendimentoService.list().subscribe(atendimentos => {
        this.atendimentos = atendimentos;
      });*/
  }

  private removeInfoCard(evt) {
    let target = evt.target;
    while (target != null && target !== this.infoCard.nativeElement) target = target.parentNode;

    if (target === null || target === undefined) {
      this.showInfoCard = false;
      document.removeEventListener('click', this.removeInfoCard);
    }
  }

  public openInfoCard(e) {
    e.stopPropagation();
    this.showInfoCard = !this.showInfoCard;
    document.addEventListener('click', this.removeInfoCard);
  }

}
