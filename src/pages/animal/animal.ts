import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiService } from '../../providers/api.service';
import { Animal } from '../../models/models';
import { AnimalListPage } from '../animallist/animallist';

@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html'
})
export class AnimalPage {

  animalId: number;
  animal: Animal;

  constructor(private navCtrl: NavController, private navParam: NavParams, private api: ApiService) {
    this.animalId = this.navParam.get('animalId') || 0;
    this.animal = this.api.getAnimal(this.animalId);
    this.animal.content = this.animal.content.replace('src="//www.youtube.com', 'src="https://www.youtube.com');
  }

  goReturn() {
    this.navCtrl.setRoot(AnimalListPage);
  }
}
