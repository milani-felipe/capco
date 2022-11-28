import { Component, Input } from '@angular/core';

export type BidType = 'sell' | 'buy';
@Component({
  selector: 'app-bids-list',
  templateUrl: './bids-list.component.html',
  styleUrls: ['./bids-list.component.scss']
})
export class BidsListComponent {

  @Input() data = [];

  exhibit = [];

  ngOnChanges() {
    if (this.data) {
      this.exhibit = this.data.slice(0, 10);
    }
  }

  toggle() {
    if (this.exhibit.length === 10) {
      this.exhibit = this.data
    } else {
      this.exhibit = this.data.slice(0, 10);
    }
  }

}
