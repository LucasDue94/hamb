import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {AlertService} from "../core/alert/alert.service";
import {Alert} from "../core/alert/alert";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, DoCheck {
  alert: Alert;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    this.alertService.receive().subscribe(alert => this.alert = alert);
  }

}
