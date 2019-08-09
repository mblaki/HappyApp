import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  messages;

  constructor(private messageService: MessageService) {}

  getMessage() {
    this.messages = this.messageService.getMessages();
    console.log(this.messages);
  }

  private barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  private barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  private barChartType: string = 'bar';
  private barChartLegend: boolean = true;

  private barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // events
  private chartClicked(e: any): void {
      console.log(e);
  }

  private chartHovered(e: any): void {
      console.log(e);
  }

  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

}
