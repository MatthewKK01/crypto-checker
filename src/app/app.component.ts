import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-tracker';
  selectedCurrency: string = "usd"
  constructor() {
    console.log(this.selectedCurrency);
  }


  sendCurrency(event: string) {
    console.log(event);
  }

}
