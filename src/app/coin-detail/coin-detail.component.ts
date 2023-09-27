import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from "chart.js"
import { CurrencyService } from '../service/currency-service.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit {

  coinData: any;
  coinId!: string;
  days: number = 30;
  currency: string = "usd".toUpperCase();

  public ChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  }
  public chartOption: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  }
  public ChartType: ChartType = 'line'

  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;

  constructor(private api: ApiService, private route: ActivatedRoute, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    //get :id param
    this.route.params.subscribe((val) => {
      this.coinId = val["id"]
    })
    this.getCoinData()
    this.getGraphData()
    this.currencyService.getCurrency().subscribe(val => {
      this.currency = val.toUpperCase();
      this.getGraphData()
      this.getCoinData()
    })

  }

  getCoinData() {
    this.api.getCurrencyById(this.coinId).subscribe((res) => {
      switch (this.currency) {
        case "USD":
          res.market_data.current_price.inr = res.market_data.current_price.usd;
          res.market_data.market_cap.inr = res.market_data.market_cap.usd;
          break;
        case "EUR":
          res.market_data.current_price.inr = res.market_data.current_price.eur;
          res.market_data.market_cap.inr = res.market_data.market_cap.eur;
          break;
        case "GBP":
          res.market_data.current_price.inr = res.market_data.current_price.gbp;
          res.market_data.market_cap.inr = res.market_data.market_cap.gbp;
          break;

        // Default case, no conversion needed
        default:
          res.market_data.current_price.inr = res.market_data.current_price.inr;
          res.market_data.market_cap.inr = res.market_data.market_cap.inr;
          break;
      }

      this.coinData = res;
    });

  }

  getGraphData() {
    this.api.getGrpahicalCurrencyData(this.coinId, this.currency.toUpperCase(), this.days).subscribe((res) => {
      setTimeout(() => {
        this.myLineChart.chart?.update();
      }, 200);
      this.ChartData.datasets[0].data = res.prices.map((a: any) => {
        return a[1];
      })
      this.ChartData.labels = res.prices.map((a: any) => {
        let date = new Date(a[0]);
        let time = date.getHours() > 12 ? `${date.getHours() - 12} : ${date.getMinutes()} PM` : `${date.getHours()} : ${date.getMinutes()} AM`
        return this.days === 1 ? time : date.toLocaleTimeString()
      })
    })
  }

}
