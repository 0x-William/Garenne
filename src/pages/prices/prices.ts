import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-prices',
  templateUrl: 'prices.html'
})
export class PricesPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getPrices()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
