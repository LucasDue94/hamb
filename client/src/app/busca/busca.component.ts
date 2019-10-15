import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PacienteService} from "../core/paciente/paciente.service";
import {Paciente} from "../core/paciente/paciente";
import {debounceTime, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {SpinnerService} from "../core/spinner/spinner.service";
import {ErrorService} from "../core/error/error.service";

@Component({
  selector: 'busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  pacientes: Paciente[];
  searchForm: FormGroup;
  searchControl: FormControl;
  offset = 0;
  max = 15;
  showCard = false;
  currentPaciente;

  constructor(private render: Renderer2, private pacienteService: PacienteService,
              private router: Router, private spinnerService: SpinnerService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
    this.spinnerService.show();
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.spinnerService.hide();
  }


  scrollDown() {
    this.spinnerService.show();
    this.offset += 15;
    this.pacienteService.search(this.searchControl.value, this.offset, this.max).subscribe(pacientes => {
      if (this.errorService.hasError(pacientes)) this.errorService.sendError(pacientes);
      pacientes.forEach(paciente => this.pacientes.push(paciente));
      this.spinnerService.hide();
    });
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinnerService.show();
        this.offset = 0;
        if (this.pacientes != undefined) this.pacientes.length = 0;
        return this.pacienteService.search(changes, this.offset, this.max)
      })
    ).subscribe(res => {
      if (this.errorService.hasError(res)) this.errorService.sendError(res);
      this.pacientes = res;
      this.spinnerService.hide();
    });
  }

  toogle(paciente) {
    this.currentPaciente = paciente;
    this.showCard = !this.showCard;
  }

  goAtendimento(paciente) {
    this.router.navigate(['atendimento', paciente.id])
  }
}
