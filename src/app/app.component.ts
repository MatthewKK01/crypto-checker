import { Component } from '@angular/core';
import { CurrencyService } from './service/currency-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crypto-tracker';
  selectedCurrency: string = "usd"
  constructor(private currencyService: CurrencyService) {
    console.log(this.selectedCurrency);
  }


  sendCurrency(event: string) {
    this.currencyService.setCurrency(event);
  }

}
