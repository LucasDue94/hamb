import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableContent = [
    ['1234','joaquim jose da silva ferreira','1234'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
    ['0001','pedro matias da mooita sauro','0001'],
  ];
  tableHead = ['login','nome','crm'];
  options = true;

  constructor() { }

  ngOnInit() {
    console.log(this.tableContent);
  }

}
