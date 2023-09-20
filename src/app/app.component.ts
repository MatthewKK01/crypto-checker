import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-tracker';

  constructor() { }
  currency: string = "usd"
  sendCurrency(e: string) {
    console.log(e);
  }
}
