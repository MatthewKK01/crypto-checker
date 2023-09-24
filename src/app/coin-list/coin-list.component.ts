import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';



@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {
  }
  bannerData: any = [];


  displayedColumns: string[] = [`symbol`, `current_price`, `price_change_percentage_24h`, `market_cap`]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.getBannerData();
    this.getTrendingData();
  }

  getBannerData() {
    this.api.getAllData().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.bannerData = res
    })
  }
  getTrendingData() {
    this.api.getTrendingCurrency().subscribe(res => console.log(res))
  }

  navigateToDetails(row: any) {
    this.router.navigate(["coin-detail", row.id]);
  }
}
