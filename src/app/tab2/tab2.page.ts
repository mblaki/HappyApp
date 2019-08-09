import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  messages: Message[];
  message: Message;
  underpoint2;
  underpoint4;
  underpoint6;
  underpoint8;
  under1;
  under5;
  over5;

  constructor(private messageService: MessageService, private firestore: AngularFirestore) {
    messageService = new MessageService(firestore);
    this.messages = [];
  }

  ionViewWillEnter() {
    this.getMessages(); // runs get messages function every time the component is viewed
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
    this.populateBarChart();
  }

  countMessages(lower, higher) {
    var count = 0;
    for (var i = 0; i < this.messages.length; i++) {
      if (this.messages[i].score < higher && this.messages[i].score >= lower) {
        count++;
      }
    }
    console.log(count);
    return count;
  }

  populateBarChart() {
    this.underpoint2 = this.countMessages(-100000, 0.2);
    this.underpoint4 = this.countMessages(0.2, 0.4);
    this.underpoint6 = this.countMessages(0.4, 0.6);
    this.underpoint8 = this.countMessages(0.6, 0.8);
    this.under1 = this.countMessages(0.8, 1);
    this.under5 = this.countMessages(1, 5);
    this.over5 = this.countMessages(5, 10000000);

    this.barChartData = [
      {
        data: [this.underpoint2, this.underpoint4, this.underpoint6, this.underpoint8, this.under1, this.under5, this.over5],
        label: "Number of Messages"
      }
    ]
  }

  private barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private barChartLabels: string[] = ['Under 0.2', 'Under 0.4', 'Under 0.6', 'Under 0.8', 'Under 1', 'Under 5', 'Over 5'];
  private barChartType: string = 'bar';
  private barChartLegend: boolean = true;

  private barChartData: any[] = [
    { data: [this.underpoint2, this.underpoint4, this.underpoint6, this.underpoint8, this.under1, this.under5, this.over5],
      label: "Number of Messages"
    }
  ];

  // events
  private chartClicked(e: any): void {
      console.log(e);
  }

  private chartHovered(e: any): void {
      console.log(e);
  }
}
