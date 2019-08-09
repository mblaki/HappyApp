import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  stringVal: string = "";

  constructor(public alertCtrl: AlertController) {}

  async destroyWorld(list) {
    const alert = await this.alertCtrl.create({
      header: "WAIT!",
      subHeader: "Are you sure?",
      message: "Negativity can negatively impact your emotions and the people around you. Do you really want to activate negativity mode?",
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

}
