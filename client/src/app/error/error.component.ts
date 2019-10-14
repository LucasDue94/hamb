import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.cod = params['cod'];
      this.message = params['message'];
    })
  }
}
