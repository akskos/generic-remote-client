import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {

  }

  presentActionSheet(): void {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'title',
      buttons: [
        {
          text: 'Button 1',
          role: 'button1',
          handler: () => {
            console.log('Button 1 clicked!');
          }
        },
        {
          text: 'Button 2',
          role: 'button2',
          handler: () => {
            console.log('Button 2 clicked!')
          }
        }
      ]
    });

    actionSheet.present();
  }

}
