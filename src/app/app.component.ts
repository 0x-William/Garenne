import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { TranslateService } from '../providers/translate.service'

import { Tutorial1Page } from '../pages/tutorial1/tutorial1';
import { WelcomePage } from '../pages/welcome/welcome';
import { MapPage } from '../pages/map/map';
import { HoursPage } from '../pages/hours/hours';
import { PricesPage } from '../pages/prices/prices';
import { ReglementPage } from '../pages/reglement/reglement';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { BlogListPage } from '../pages/bloglist/bloglist';
import { ContactPage } from '../pages/contact/contact';
import { ImpressumPage } from '../pages/impressum/impressum';
import { QuizzPage } from '../pages/quizz/quizz';
import { SettingsPage } from '../pages/settings/settings';

const LEFT_MENUS = [
  { title: 'menu.left.welcome', component: WelcomePage },
  { title: 'menu.left.plan', component: MapPage },
  { title: 'menu.left.schedule', component: HoursPage },
  { title: 'menu.left.prices', component: PricesPage },
  { title: 'menu.left.reglement', component: ReglementPage },
  { title: 'menu.left.restaurant', component: RestaurantPage },
  { title: 'menu.left.news', component: BlogListPage },
  { title: 'menu.left.contacts', component: ContactPage },
  { title: 'menu.left.impressum', component: ImpressumPage },
  { title: 'menu.left.settings', component: SettingsPage },
];

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  leftMenuTitle: string = '';
  leftMenus: Array<{title: string, component: any}> = [];

  rightMenuTitle: string = '';
  rightMenus: Array<{point: number, title: string}> = [];
  
  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public events: Events,
    private translateService: TranslateService,
    private localNotifications: LocalNotifications,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.statusBar.styleBlackTranslucent();
      } else {
        this.statusBar.styleDefault()
      }
      this.splashScreen.hide();

      this.localNotifications.hasPermission()
        .then(granted => {
          if (!granted) {
            this.localNotifications.registerPermission();
          }
        });

      this.localNotifications.on('click', (notification, state) => {
        let data = JSON.parse(notification.data);
        if (data && data.point) {
          this.openPoint(data.point);
        }
      });

      this.translateService.load('fr')
        .then(() => {
          this.events.subscribe('refreshLeftMenu', () => {
            this.leftMenuTitle = 'menu.left.title';
            this.leftMenus = LEFT_MENUS;
          }); 
          
          this.events.subscribe('refreshRightMenu', menuItems => {
            this.rightMenuTitle = 'menu.right.title';
            this.rightMenus = menuItems;
          });

          this.events.subscribe('gotoPoint', point => {
            this.openPoint(point);
          });
    
          this.events.publish('refreshLeftMenu');
          this.events.publish('refreshRightMenu', []);
          this.rootPage = Tutorial1Page;
        });      
    });
  }

  openPage(info) {
    this.nav.setRoot(info.component);
  }

  openPoint(point) {
    this.nav.setRoot(QuizzPage, { point });
  }

}
