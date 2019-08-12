import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'fast-search',
  templateUrl: './fast-search.component.html',
  styleUrls: ['./fast-search.component.scss']
})
export class FastSearchComponent implements OnInit {

  @Input() service;
  /* Instância do service,passada pelo elemento pai cujo a busca será realizada  */
  @Input() fields: String[];
  /* Campos que serão mostrados da busca*/
  @Input() widthField: String[];
  /* Tamanho de cada campo que será apresentado
  * ex: fields = ['Nome','CPF'] -- widthField=['2','1']
  * Neste exemplo o campo nome, ocupará 2x mais espaço que o CPF
  * Os valores recebidos podem ser '1' ,'2' e '3' */
  @Input() messageStatus = 'Nenhum dado foi encontrado!';
  /* Mensagem que será apresentada ao usuário caso a busca retorne vazia*/
  @Input() height = '300px';
  /* Tamanho do container que será apresentado os itens da busca. */
  @Output() getData: EventEmitter<any> = new EventEmitter();
  /*Evento emitido retornando o json com elemento clicado */
  searchForm: FormGroup;
  searchControl: FormControl;
  dataArray;
  max = 25;
  offset = 0;

  constructor(private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });

    this.service.list(this.max, this.offset).subscribe(
      res => {
        this.dataArray = res;
        this.spinner.hide();
      });
    this.search()
  }

  emitData(data) {
    this.getData.emit(data);
    this.dataArray = null;
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        this.spinner.show();
        this.offset = 0;
        if (this.dataArray != undefined) this.dataArray.length = 0;
        return this.service.search(changes, this.offset)
      })
    ).subscribe(res => {
      this.dataArray = res;
      this.spinner.hide();
    });
  }

  scrollDown() {
    this.spinner.show();
    this.offset += 25;
    this.service.search(this.searchControl.value, this.offset, this.max).subscribe(data => {
      data.forEach(d => this.dataArray.push(d));
      this.spinner.hide();
      console.log(data);
    });
  }
}
