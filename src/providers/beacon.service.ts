import { Injectable } from '@angular/core';
import { Platform, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Beacon } from '../models/models';
import { ApiService } from './api.service';
import { TranslateService } from './translate.service';

@Injectable()
export class BeaconService {

  private beacons: Array<Beacon> = [];
  private isPause = false;
   
  constructor(
		private events: Events,
    private platform: Platform,
    private alertCtrl: AlertController,
    private ibeacon: IBeacon,
    private storage: Storage,
    private localNotifications: LocalNotifications,
    private api: ApiService,
    private translate: TranslateService,
  ) { }

  load(): Promise<void> {
    return this.api.getBeacons()
      .then(data => {
        this.beacons = data;
        // this.beacons[0].uuid = '8492E75F-4FD6-469D-B132-043FE94921D8';

        this.ibeacon.requestAlwaysAuthorization();
        
        const delegate = this.ibeacon.Delegate();
        delegate.didRangeBeaconsInRegion()
          .subscribe(
            data => {
              if (data.beacons.length > 0) {
                const beacon = data.beacons[0];
                const arr = this.beacons.filter(info => beacon.uuid.toUpperCase()  == info.uuid && beacon.accuracy < info.threshold);
                if (arr.length > 0) {
                  let beaconRegion = this.ibeacon.BeaconRegion(arr[0].name, arr[0].uuid);
                  this.ibeacon.stopRangingBeaconsInRegion(beaconRegion);
                  this.update(arr[0]);
                }
              }
            },
            error => console.error()
          );
          
        delegate.didEnterRegion()
          .subscribe(
            data => {
              const region = data.region;
              const arr = this.beacons.filter(info => region['uuid'].toUpperCase() == info.uuid);
              if (arr.length > 0) {
                let beaconRegion = this.ibeacon.BeaconRegion(arr[0].name, arr[0].uuid);
                this.ibeacon.stopMonitoringForRegion(beaconRegion);
                this.notify(arr[0]);
              }
            }
          );

        this.platform.pause.subscribe(() => {
          this.isPause = true;
        });
  
        this.platform.resume.subscribe(() => {
          this.isPause = false;
        });

        const isAndroid = this.platform.is('android');
        let promises = [];
        this.beacons.map(beacon => {
          beacon.threshold = isAndroid ? beacon.threshold_android : beacon.threshold_apple;
          promises.push(this.storage.get(beacon.name).then(active => {
            beacon.isActive = active;
          }));
        });
        
        return Promise.all(promises).then(() => {
          this.refreshMenu();
        });

      });
  }

  getBeacon(point: number) {
    return this.beacons[point - 1];
  }


  listen() {
    this.beacons.map(beacon => {
      let beaconRegion = this.ibeacon.BeaconRegion(beacon.name, beacon.uuid);
      this.ibeacon.startRangingBeaconsInRegion(beaconRegion);
      this.ibeacon.startMonitoringForRegion(beaconRegion);
    });
  }
  
  update(beacon: Beacon) {
    var date = new Date();
    var dvisite = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    this.storage.set('datevisite', dvisite);

    if (!beacon.isActive) {
      beacon.isActive = true;
      this.storage.set(beacon.name, true);

      this.refreshMenu();

      this.alertCtrl.create({
        title: beacon.name,
        subTitle: this.translate.get('dialogs.point'),
        buttons: [{
          text: this.translate.get('dialogs.add'),
          role: 'cancel',
        }, {
          text: this.translate.get('dialogs.read'),
          handler: () => {
            this.events.publish('gotoPoint', this.beacons.indexOf(beacon) + 1);
          }
        }]
      }).present();
    }
  };

	notify(beacon: Beacon) {
    if (this.isPause && !beacon.isActive) {
      beacon.isActive = true;
      this.storage.set(beacon.name, true);
      this.refreshMenu();

      this.localNotifications.schedule({
        id: 1,
        title: beacon.name,
        text: this.translate.get('dialogs.point'),
        data: { point: this.beacons.indexOf(beacon) + 1 },
        icon: 'notify_icon',
      });
    }
  };

  deactiveAllBeacons() {
		this.beacons.map(beacon => {
      beacon.isActive = false;
      this.storage.set(beacon.name, false);
    });
    this.listen();
    this.refreshMenu();
	}
  
	activeAllBeacons() {
		for (let i=0; i<this.beacons.length; i++) {
      const beacon: Beacon = this.beacons[i];
			beacon.isActive = true;
      this.storage.set(beacon.name, true);
		}
		this.refreshMenu();
	}

  refreshMenu() {
    const menuItems = [];
    for (let i=0; i<this.beacons.length; i++) {
      const beacon: Beacon = this.beacons[i];
      if (beacon.isActive) {
        menuItems.push({ point: i + 1, title: beacon.name });
      }
    }
    this.events.publish('refreshRightMenu', menuItems);
  }

}