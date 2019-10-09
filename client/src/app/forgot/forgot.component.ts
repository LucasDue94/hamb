import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgot: FormGroup;

  constructor() {
    this.forgot = new FormGroup({
      email: new FormControl(''),
      usuario: new FormControl(''),
    })
  }

  ngOnInit() {
  }

}
