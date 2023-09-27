import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // Initialize a private BehaviorSubject with a default currency value of "usd"
  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>("usd")

  constructor() { }

  // Get a read-only observable of the selected currency
  getCurrency() {
    return this.selectedCurrency$.asObservable();
  }

  // Update the selected currency by emitting a new value to subscribers
  setCurrency(currency: string) {
    return this.selectedCurrency$.next(currency);
  }
}
