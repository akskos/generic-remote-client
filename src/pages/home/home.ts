import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

import { ClientProvider } from '../../providers/client-provider';

import { Response } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public client: ClientProvider) {

  }

  gotoSettings() {
    this.navCtrl.push(SettingsPage);
  }

  function(id) {
    let observable = this.client.executeFunction(id);
    observable.subscribe((res: Response) => {
      let data = res.json();
      if (data.status == 9001) {
        console.log('Function executed successfully');
      } else if (data.status == 666) {
        console.log('Function execution failed');
      }
    });
  }

}
