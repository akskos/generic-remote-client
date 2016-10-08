import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client-provider';
import { ConfigProvider } from '../../providers/config-provider';

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

  constructor(
    public navCtrl: NavController,
    public client: ClientProvider,
    public config: ConfigProvider) {
  }

  ionViewDidLoad() {
    console.log('Hello Settings Page');
  }

  togglePassword(checked: boolean) {
    this.config.passwordOn = checked;
  }

  portChanged(event: any) {
    let strPort: string = event.target.value;
    this.config.port = parseInt(strPort);
  }

  addressChanged(event: any) {
    let address: string = event.target.value;
    this.config.serverAddress = address;
  }

  passwordChanged(event: any) {
    let password: string = event.target.value;
    this.config.password = password;
  }

  showPasswordField(): boolean {
    return this.config.passwordOn;
  }
}
