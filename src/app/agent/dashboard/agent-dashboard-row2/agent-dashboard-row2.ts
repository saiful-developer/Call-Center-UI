import { Component, Inject, PLATFORM_ID } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-agent-dashboard-row2',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './agent-dashboard-row2.html',
  styleUrl: './agent-dashboard-row2.css'
})

export class AgentDashboardRow2 {

  public isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }


  public barChartType: ChartType = 'bar';
  public pieChartType: ChartType = 'pie';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: false,
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [10, 20, 30],
        label: 'Test Data',
        backgroundColor: '#42A5F5'
      }
    ]
  };

  pieChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

}