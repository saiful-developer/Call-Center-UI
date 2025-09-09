import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { PageHeader } from '../../shared/page-header/page-header';

@Component({
  selector: 'app-chart-js',
  imports: [PageHeader],
  templateUrl: './chart-js.html',
  styleUrl: './chart-js.css'
})
export class ChartJs implements AfterViewInit {

  @ViewChild('lineChart') lineChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('areaChart') areaChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChart') doughnutChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart') pieChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('scatterChart') scatterChart!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.createLineChart();
    this.createBarChart();
    this.createAreaChart();
    this.createDoughnutChart();
    this.createPieChart();
    this.createScatterChart();
  }

  createLineChart() {
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Sales',
          data: [30, 45, 28, 60],
          borderColor: '#ff6384',
          fill: false
        }]
      }
    });
  }

  createBarChart() {
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Green'],
        datasets: [{
          label: 'Votes',
          data: [12, 19, 7],
          backgroundColor: ['#ffe0e6', '#cdebff', '#dbf2f2']
        }],
      }
    });
  }

  createAreaChart() {
    new Chart('areaChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Traffic',
          data: [10, 50, 25, 70],
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'teal',
          fill: true
        }]
      }
    });
  }

  createDoughnutChart() {
    new Chart('doughnutChart', {
      type: 'doughnut',
      data: {
        labels: ['Download', 'Upload', 'Idle'],
        datasets: [{
          label: 'Network',
          data: [300, 50, 100],
          backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384']
        }]
      }
    });
  }

  createPieChart() {
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Chrome', 'Safari', 'Firefox'],
        datasets: [{
          label: 'Browsers',
          data: [60, 25, 15],
          backgroundColor: ['#84fbceff', '#f4847aff', '#ff90f2ff']
        }]
      }
    });
  }

  createScatterChart() {
    new Chart('scatterChart', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Performance',
          data: [
            { x: 10, y: 20 },
            { x: 20, y: 10 },
            { x: 15, y: 30 },
            { x: 25, y: 25 }
          ],
          backgroundColor: 'red'
        }]
      }
    });
  }


}
