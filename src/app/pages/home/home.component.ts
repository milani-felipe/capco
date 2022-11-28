import { Component, OnInit } from '@angular/core';
import { BidsService } from 'src/app/components/bids.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bids: any;
  showTrades = false;

  constructor(private bidsService: BidsService) { }

  ngOnInit(): void {
    this.bidsService.getBids().subscribe(resp => {
      this.bids = resp;
    })
  }

  toggleTrades() {
    this.showTrades = !this.showTrades;
  }

}
