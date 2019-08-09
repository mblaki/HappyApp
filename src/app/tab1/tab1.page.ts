import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { AngularFirestore } from '@angular/fire/firestore';

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
  
  constructor(private messageService: MessageService, private firestore: AngularFirestore) {
    messageService = new MessageService(firestore);
    this.message = new Message();
    this.messages = [];

   }

   ionViewWillEnter() {
    this.getMessages(); // runs get messages function every time the component is viewed
  }


  createMessage() {
    var sentiment = new Sentiment();
    this.message.score= sentiment.analyze(this.message_string).score;

    console.log("debg: " + this.message.score);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    this.message.dateCreated = dd + '/' + mm + '/' + yyyy;

    this.message.message=this.message_string;

    this.messageService.createMessage(this.message);
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
}
