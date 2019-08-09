import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { AngularFirestore } from '@angular/fire/firestore';

import { AlertController } from '@ionic/angular';

import Sentiment from 'sentiment';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})





export class Tab1Page {
  messages: Message[];
  message: Message;

  public message_string: string;
  public score: number;
  public date: string;
  public isNegative= false;
  public appTitle:string ="Happy App";

  constructor(private messageService: MessageService, private firestore: AngularFirestore, public alertCtrl: AlertController) {
    messageService = new MessageService(firestore);
    this.message = new Message();
    this.messages = [];

  }

  ionViewWillEnter() {
    this.getMessages(); // runs get messages function every time the component is viewed
  }


  async createMessage() {
    var sentiment = new Sentiment();
    this.message.score = sentiment.analyze(this.message_string).comparative;
    if (this.message.score < 1) {
      const alert = await this.alertCtrl.create({
        header: "Positivity not detected!",
        subHeader: "Having a bad day?",
        message: "This will only display is negativity mode is enabled",
        buttons: [
          {
            text: 'Back',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.message_string = "";
            }
          }, {
            text: 'Add Anyways',
            handler: () => {
              console.log("add it anyways");
              let today = new Date();
              let dd = String(today.getDate()).padStart(2, '0');
              let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              let yyyy = today.getFullYear();
              this.message.dateCreated = dd + '/' + mm + '/' + yyyy;

              this.message.message = this.message_string;

              this.messageService.createMessage(this.message);
              this.message_string = "";
            }
          }
        ]
      });
      await alert.present();
    } else {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      this.message.dateCreated = dd + '/' + mm + '/' + yyyy;

      this.message.message = this.message_string;

      this.messageService.createMessage(this.message);
      this.message_string = "";
    }

  }

  getMessages() {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Message;
      })
      this.messages.sort((message1, message2) => ((message1.dateCreated < message2.dateCreated) ? 1 : -1)); // order messages (optional)
    });
  }

  setNegativity(){
    this.isNegative = !this.isNegative;
    if(this.isNegative){
      this.appTitle = "Happy App";
    } else {
      this.appTitle = "App";
    }
  }
}
