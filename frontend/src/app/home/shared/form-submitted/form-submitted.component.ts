import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-form-submitted',
  templateUrl: './form-submitted.component.html',
  styleUrls: ['./form-submitted.component.scss'],
  animations: [
    state('open', style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      height: '100px',
      opacity: 0.8,
      backgroundColor: 'blue'
    })),
    transition('open => closed', [
      animate('1s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ],


})
export class FormSubmittedComponent implements OnInit {
  show: boolean = true;
  constructor() {

  }
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }


  ngOnInit(): void {
  }

}
