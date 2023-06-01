import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-un-logged-main',
  template: ` <p>unLogged-main works!</p>
    <router-outlet></router-outlet>`,
  styleUrls: ['./un-logged-main.component.scss'],
})
export class UnLoggedMainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
