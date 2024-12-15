import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-general-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './general-dashboard.component.html',
  styleUrls: ['./general-dashboard.component.scss']
})
export class GeneralDashboardComponent implements OnInit {
  

 

  

  // Configuration des données du graphique
  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { data: [12, 19, 3, 5, 2, 3], label: 'Series A', backgroundColor: '#57CBD4' },
      { data: [8, 15, 6, 10, 4, 6], label: 'Series B', backgroundColor: '#57D45F' }
    ]
  };

  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#000' }
      }
    },
    scales: {
      x: { ticks: { color: '#000' } },
      y: { ticks: { color: '#000' } }
    }
  };

  public pieChartData: ChartData<'pie'> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      { data: [30, 50, 20], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
    ]
  };
  public pieChartType: ChartType = 'pie';

  public lineChartData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Temperature',
        borderColor: '#57CBD4',
        pointBackgroundColor: '#57D45F',
        fill: false
      }
    ]
  };
  public lineChartType: ChartType = 'line';
  
  constructor() {}

  ngOnInit(): void {
    this.updateChartOptions(); // Applique le thème initial
  }


  private updateChartOptions(): void {
    
      this.barChartOptions = {
        ...this.barChartOptions,
        plugins: {
          legend: {
            labels: { color: 'white' }
          }
        },
        scales: {
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          },
          y: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255,255,255,0.1)' }
          }
        }
      };
    
      this.barChartOptions = {
        ...this.barChartOptions,
        plugins: {
          legend: {
            labels: { color: '#000' }
          }
        },
        scales: {
          x: {
            ticks: { color: '#000' },
            grid: { color: '#ccc' }
          },
          y: {
            ticks: { color: '#000' },
            grid: { color: '#ccc' }
          }
        }
      };
    }
  }

