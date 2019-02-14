import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-missions',
  templateUrl: 'missions.html'
})
export class MissionsPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getMission()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
