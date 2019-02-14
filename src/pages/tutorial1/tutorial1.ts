import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BeaconService } from '../../providers/beacon.service';
import { ApiService } from '../../providers/api.service';
import { Tutorial2Page } from '../tutorial2/tutorial2';
import { WelcomePage } from '../welcome/welcome';

const LATITUDE = 34.671442;
const LONGITUDE = 135.643151;
const RADIUS = 3000;   // meter

@Component({
  selector: 'page-tutorial1',
  templateUrl: 'tutorial1.html'
})
export class Tutorial1Page {

  loading: boolean;

  constructor(private navCtrl: NavController, private beaconService: BeaconService, private api: ApiService) {
    this.load();
  }

  load() {
    this.loading = true;

    this.beaconService.load()
      .then(() => {
        this.beaconService.listen();
        this.api.getEvents().then(
          () => this.setEventNotifications()
        );
      });
  }

  setEventNotifications() {
    this.loading = false;

    const geoalarm = (<any>window).geoalarm;
    geoalarm.initialize()
    .then(
      () => {
        const alarms = [];
        this.api.events.map(event => {
          const arr = event.hour.split(':');
          let date = new Date();
          date.setHours(parseInt(arr[0]));
          date.setMinutes(parseInt(arr[1]));
          date.setTime(date.getTime() - 60*10*1000);
    
          alarms.push({
            latitude: LATITUDE,
            longitude: LONGITUDE,
            radius: RADIUS,
            time: date.getHours() + ':' + date.getMinutes(),
            title: 'Garenne',
            text: event.name,        
          });
        });
        geoalarm.addAlarm(alarms);
      },
      (err) => console.log(err)
    );
  }

  goTutorial2() {
    this.navCtrl.setRoot(Tutorial2Page);
  }

  goWelcome() {
    this.navCtrl.setRoot(WelcomePage);
  }

}
