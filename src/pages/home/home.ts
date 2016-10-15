import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

import { ClientProvider } from '../../providers/client-provider';

import { Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public client: ClientProvider, public alertCtrl: AlertController) {

  }

  gotoSettings() {
    this.navCtrl.push(SettingsPage);
  }

  function(id) {
    try {
        let observable = this.client.executeFunction(id);

        observable.subscribe((res: Response) => {
          let data = res.json();
          if (data.status == 9001) {
            console.log('Function executed successfully');
          } else if (data.status == 666) {
            let alert = this.alertCtrl.create({
              title: 'Command failed',
              subTitle: 'Error code 666',
              buttons: ['Ok']
            });
            alert.present();
          }
        });
    } catch (e) {
        let alert = this.alertCtrl.create({
          title: 'Request failed',
          subTitle: 'Failed to create request',
          buttons: ['Ok']
        });
        alert.present();
    }
  }

}
