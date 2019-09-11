import {AfterViewInit, Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, AfterViewInit {

  @Input('fullScreen') fullScreen = true;
  @Input('width') width: string;
  @Input('height') height: string;
  @ViewChild('spinnerContainer', {static: false}) spinnerContainer;
  spinnerComponent;
  root;

  constructor(private render: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.root = document.getElementsByTagName('app-root')[0];
    this.spinnerComponent = this.render.parentNode(this.spinnerContainer.nativeElement);
    if (this.fullScreen) this.render.appendChild(this.root, this.spinnerComponent);
    if (this.width != undefined) this.render.setStyle(this.spinnerContainer.nativeElement, 'width', this.width);
    if (this.height != undefined) {
      this.render.setStyle(this.spinnerContainer.nativeElement, 'height', this.height);
      this.render.setStyle(this.spinnerContainer.nativeElement, 'bottom', '0');
      this.render.setStyle(this.spinnerContainer.nativeElement, 'top', 'auto');
    }
  }
}
