import {Component, DoCheck, OnInit} from '@angular/core';
import {AlertService} from "../core/alert/alert.service";
import {Alert} from "../core/alert/alert";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  alert: Alert;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {

  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(alert => {
      this.alert = alert;
    });
  }

}
