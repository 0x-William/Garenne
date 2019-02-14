import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-hours',
  templateUrl: 'hours.html'
})
export class HoursPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getHours()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
