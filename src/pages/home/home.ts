import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';

import { ClientProvider } from
 '../../providers/client-provider';

import { Response } from '@angular/http';

import * as Rx from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  commandNames: string[] = [];
  loadCommandNames: any;
  namesForCommandsReceived: boolean;

  constructor(public navCtrl: NavController, public client: ClientProvider, public alertCtrl: AlertController) {

    this.commandNames.push('1');
    this.commandNames.push('2');
    this.commandNames.push('3');
    this.commandNames.push('4');

    this.namesForCommandsReceived = false;

    // Create stream for loading command names
    this.loadCommandNames = new Rx.Subject();
    this.loadCommandNames.filter(
      (x: any) => {
        // Check that config is ready
        if (this.client.configIsAvailable()) {
          return true;
        }
        this.namesForCommandsReceived = false;
        return false;
      }
    ).flatMap(
      (x: any) => {
        return this.client.requestCommandNames().catch(
          (err: Error, caught: Rx.Observable<any>) => {
            this.alert('Error', `Couldn't connect to the server`);
            return Rx.Observable.empty();
          }
        );
      }
    ).subscribe(
      (commandNameStreams: any) => {
        for (let i = 0; i < commandNameStreams.length; i++) {
          commandNameStreams[i].subscribe(
            (commandInfo: any) => {
              this.commandNames[commandInfo.id] = commandInfo.name;
            }
          );
        }
        this.namesForCommandsReceived = true;
      },
      (err: Error) => {
        this.alert('Error', '');
      }
    );
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.loadCommandNames.next(1);
  }

  gotoSettings() {
    this.navCtrl.push(SettingsPage);
  }

  alert(title, subtitle='') {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Ok']
    });
    alert.present();
  }

  function(id) {
    try {
        let observable = this.client.executeFunction(id);

        observable.subscribe(
          (res: Response) => {
            let data = res.json();
            if (data.status == 9001) {
              console.log('Function executed successfully');
            } else if (data.status == 666) {
              this.alert('Command failed', 'Error code 666');
            }
          },
          (err: any) => {
            this.alert('Request failed');
          }
        );
    } catch (e) {
        this.alert('Failed to create request', 'Something wrong with server config');
        console.log(e);
    }
  }

}
