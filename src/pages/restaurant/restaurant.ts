import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html'
})
export class RestaurantPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getRestaurant()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
