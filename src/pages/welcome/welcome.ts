import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { AnimalListPage } from '../animallist/animallist';
import { MissionsPage } from '../missions/missions';
import { EventsPage } from '../events/events';
import { GamePage } from '../game/game';

import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  loading: boolean;
  imageUrl: string;

  constructor(private navCtrl: NavController, private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getMapImage()
      .then(data => {
        this.loading = false;
        this.imageUrl = data;
      });
  }

  goMap() {
    this.navCtrl.setRoot(MapPage);
  }

  goAnimals() {
    this.navCtrl.setRoot(AnimalListPage);
  }
  
  goMissions() {
    this.navCtrl.setRoot(MissionsPage);
  }
  
  goEvents() {
    this.navCtrl.setRoot(EventsPage);
  }
  
  goGame() {
    this.navCtrl.setRoot(GamePage);
  }

}
