import { Component, ChangeDetectorRef } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { Beacon } from '../../models/models';
import { BeaconService } from '../../providers/beacon.service';

@Component({
  selector: 'page-quizz',
  templateUrl: 'quizz.html'
})
export class QuizzPage {

  beacon: Beacon;
  status: number = 0;

  constructor(private navParam: NavParams, private beaconService: BeaconService, private ref: ChangeDetectorRef) {
    let point = this.navParam.get('point') || 1;
    this.beacon = this.beaconService.getBeacon(point);
    console.log(this.beacon);
  }

  answer(index: number) {
    if (this.status === 0) {
      if (index === this.beacon.correct) {
        this.status = 1;
      } else {
        this.status = 2;
      }
    }    
    this.ref.detectChanges();
  }

}
