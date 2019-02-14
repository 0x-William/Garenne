import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-impressum',
  templateUrl: 'impressum.html'
})
export class ImpressumPage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getImpressum()
      .then(data => {
        this.loading = false;
        this.content = data;
      })
  }

}
