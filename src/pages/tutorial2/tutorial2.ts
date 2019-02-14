import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-tutorial2',
  templateUrl: 'tutorial2.html'
})
export class Tutorial2Page {

  constructor(private navCtrl: NavController) {
    
  }

  goWelcome() {
    this.navCtrl.setRoot(WelcomePage);
  }

}
