import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number = 1;
  currency: string = "usd"


  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get :id param
    this.route.params.subscribe((val) => {
      this.coinId = val["id"]
    })
    this.getCoinData()
    console.log(this.coinData);
  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => { console.log(res); this.coinData = res });

  }

}
