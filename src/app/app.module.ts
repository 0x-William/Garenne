import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IBeacon } from '@ionic-native/ibeacon';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { MyApp } from './app.component';

import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { TranslateService } from '../providers/translate.service';
import { ApiService } from '../providers/api.service';
import { BeaconService } from '../providers/beacon.service';

import { AnimalPage } from '../pages/animal/animal';
import { AnimalListPage } from '../pages/animallist/animallist';
import { BlogPage } from '../pages/blog/blog';
import { BlogListPage } from '../pages/bloglist/bloglist';
import { ContactPage } from '../pages/contact/contact';
import { EventsPage } from '../pages/events/events';
import { GamePage } from '../pages/game/game';
import { HoursPage } from '../pages/hours/hours';
import { ImpressumPage } from '../pages/impressum/impressum';
import { MapPage } from '../pages/map/map';
import { MissionsPage } from '../pages/missions/missions';
import { PricesPage } from '../pages/prices/prices';
import { QuizzPage } from '../pages/quizz/quizz';
import { ReglementPage } from '../pages/reglement/reglement';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { SettingsPage } from '../pages/settings/settings';
import { Tutorial1Page } from '../pages/tutorial1/tutorial1';
import { Tutorial2Page } from '../pages/tutorial2/tutorial2';
import { WelcomePage } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,

    AnimalPage,
    AnimalListPage,
    BlogPage,
    BlogListPage,
    ContactPage,
    EventsPage,
    GamePage,
    PricesPage,
    ImpressumPage,
    MapPage,
    MissionsPage,
    HoursPage,
    QuizzPage,
    ReglementPage,
    RestaurantPage,
    SettingsPage,
    Tutorial1Page,
    Tutorial2Page,
    WelcomePage,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    PipesModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AnimalPage,
    AnimalListPage,
    BlogPage,
    BlogListPage,
    ContactPage,
    EventsPage,
    GamePage,
    HoursPage,
    ImpressumPage,
    MapPage,
    MissionsPage,
    PricesPage,
    QuizzPage,
    ReglementPage,
    RestaurantPage,
    SettingsPage,
    Tutorial1Page,
    Tutorial2Page,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IBeacon,
    LocalNotifications,
    TranslateService,
    ApiService,
    BeaconService,
  ]
})
export class AppModule {}
