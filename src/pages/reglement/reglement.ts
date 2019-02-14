import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-reglement',
  templateUrl: 'reglement.html'
})
export class ReglementPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getReglement()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
