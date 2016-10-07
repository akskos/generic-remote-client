import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  usingPassword: boolean;

  constructor(public navCtrl: NavController) {
    this.usingPassword = false;
  }

  ionViewDidLoad() {
    console.log('Hello Settings Page');
  }

  togglePassword(checked: boolean) {
    this.usingPassword = checked;
  }

}
