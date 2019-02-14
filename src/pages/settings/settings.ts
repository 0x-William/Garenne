import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BeaconService } from '../../providers/beacon.service';
import { TranslateService } from '../../providers/translate.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  lastVisit: string = '';

  constructor(private alertCtrl: AlertController, private translateService: TranslateService, private storage: Storage, private beaconService: BeaconService) {
    this.storage.get('datevisite')
    .then(datevisite => {
      this.lastVisit = datevisite || '';
    });
  }

  activateAll() {
    this.beaconService.activeAllBeacons();
    this.alertCtrl.create({
      title: this.translateService.get('dialogs.d1.title'),
      subTitle: this.translateService.get('dialogs.d1.content'),
      buttons: [this.translateService.get('dialogs.ok')]
    }).present();
  }

  resetApplications() {
    this.beaconService.deactiveAllBeacons();
    this.storage.set('datevisite', '');
    this.lastVisit = '';
    this.alertCtrl.create({
      title: this.translateService.get('dialogs.d2.title'),
      subTitle: this.translateService.get('dialogs.d2.content'),
      buttons: [this.translateService.get('dialogs.ok')]
    }).present();
  }
}
