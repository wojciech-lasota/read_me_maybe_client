import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: ` <p>main works! unLogged</p>
    <router-outlet></router-outlet>`,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
