import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'fast-search',
  templateUrl: './fast-search.component.html',
  styleUrls: ['./fast-search.component.scss']
})
export class FastSearchComponent implements OnInit {

  @Input() service;
  @Input() fields: String[];
  @Input() widthField: String[];
  @Output() getData: EventEmitter<any> = new EventEmitter();
  searchForm: FormGroup;
  searchControl: FormControl;
  dataArray;
  max = 25;
  offset = 0;
  messageStatus;

  constructor() {
  }

  ngOnInit() {
    console.log(this.service);
    this.searchControl = new FormControl();
    this.searchControl.setValue('');
    this.searchForm = new FormGroup({
      searchControl: this.searchControl
    });
    this.search()
  }

  emitData(data){
    this.getData.emit(data)
  }

  search() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(changes => {
        console.log(changes);
        // this.spinner.show();
        this.offset = 0;
        if (this.dataArray != undefined) this.dataArray.length = 0;
        return this.service.search(changes, this.offset)
      })
    ).subscribe(res => {
      this.dataArray = res;
      console.log(res);
      // this.spinner.hide();
    });
  }

}
