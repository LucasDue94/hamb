import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() message;
  @Input() cod;
  messageDefault = 'Desculpe o transtorno, mas você não tem permissão para acessar a página.';
  codDefault = '403';

  constructor() {
  }

  ngOnInit() {
  }
}
