import { Component } from '@angular/core';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  loading: boolean;
  content: string;

  constructor(private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getGame()
      .then(content => {
        this.loading = false;
        this.content = content;
      })
  }

}
