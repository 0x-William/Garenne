import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Animal } from '../../models/models';
import { ApiService } from '../../providers/api.service';
import { AnimalPage } from '../animal/animal';

@Component({
  selector: 'page-animallist',
  templateUrl: 'animallist.html'
})
export class AnimalListPage {

  loading: boolean;
  animals: Array<Animal> = [];

  constructor(private navCtrl: NavController,  private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getAnimalList()
      .then(data => {
        this.loading = false;
        this.animals = data;
      })
  }

  goAnimal(animalId: number) {
    this.navCtrl.setRoot(AnimalPage, { animalId });
  } 
 
}
