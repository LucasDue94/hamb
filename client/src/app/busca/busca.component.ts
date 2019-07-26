import {Component, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {

  paciente;
  pacientes = 1;
  searchForm: FormGroup;
  searchControl: FormControl;
  max = 1000;
  offset = 0;

  constructor(private spinner: NgxSpinnerService,
              private render: Renderer2) {
  }

  ngOnInit() {
    this.spinner.show();
    this.searchControl = new FormControl();
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.spinner.hide();
  }

}
