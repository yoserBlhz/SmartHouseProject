import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SidebarComponent,HttpClientModule],
  template: `
   <div class="dashboard-layout" [class.sidebar-closed]="isSidebarClosed">
  <app-navbar></app-navbar>
  <div class="main-container">
    <app-sidebar class="app-sidebar" (sidebarToggled)="handleSidebarToggle($event)"></app-sidebar>
    <div class="main-content">
    <div class="report-container">


      <div class="cards-grid">
        <div class="card">
          <div class="card-header">
            <h2>Température</h2>
            <span class="card-subtitle">Variation sur la période</span>
          </div>
          <div class="card-body">
            <canvas #temperatureChart></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>Humidité</h2>
            <span class="card-subtitle">Taux d'humidité de l'air</span>
          </div>
          <div class="card-body">
            <canvas #humidityChart></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>Pression Atmosphérique</h2>
            <span class="card-subtitle">Mesures en hPa</span>
          </div>
          <div class="card-body">
            <canvas #pressureChart></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>Qualité de l'Air</h2>
            <span class="card-subtitle">Indice de qualité</span>
          </div>
          <div class="card-body">
            <canvas #airQualityChart></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>Consommation d'Énergie</h2>
            <span class="card-subtitle">kWh par période</span>
          </div>
          <div class="card-body">
            <canvas #energyChart></canvas>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h2>Niveau Sonore</h2>
            <span class="card-subtitle">Décibels par période</span>
          </div>
          <div class="card-body">
            <canvas #noiseChart></canvas>
          </div>
        </div>

        <div class="card wide-card">
          <div class="card-header">
            <h2>Analyse Combinée</h2>
            <span class="card-subtitle">Température et CO2</span>
          </div>
          <div class="card-body">
            <canvas #combinedChart></canvas>
          </div>
        </div>
      </div>

      <div class="notification-container" *ngIf="gasNotificationVisible">
        <div class="notification-box">
          <h3>Alerte Niveau de Gaz</h3>
          <p>Le niveau de gaz a dépassé le seuil de {{ gasThreshold }}.</p>
          <button (click)="gasNotificationVisible = false">Fermer</button>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
  `
})
export class ReportComponent implements OnInit, AfterViewInit {
  @ViewChild('temperatureChart') temperatureCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('humidityChart') humidityCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gasChart') gasCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pressureChart') pressureCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('airQualityChart') airQualityCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('energyChart') energyCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('noiseChart') noiseCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('combinedChart') combinedCanvas!: ElementRef<HTMLCanvasElement>;

  private charts: { [key: string]: Chart } = {};
  public gasNotificationVisible = false;
  public gasThreshold = 200;

  private chartData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    temperature: [21, 22, 23, 24, 23, 22, 21],
    humidity: [45, 48, 50, 47, 46, 44, 45],
    gas: [150, 160, 175, 165, 180, 190, 200],
    pressure: [1013, 1014, 1012, 1015, 1013, 1011, 1012],
    airQuality: [95, 92, 88, 85, 90, 93, 94],
    energy: [120, 125, 130, 128, 122, 118, 115],
    noise: [45, 48, 52, 55, 50, 47, 46],
    co2: [400, 420, 450, 430, 410, 405, 415]
  };
  isSidebarClosed = false;


  ngOnInit(): void {
    this.checkGasLevel();
  }
  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  private initializeCharts(): void {
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          font: { size: 16 }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Graphique de température (Area chart avec gradient)
    const tempCtx = this.temperatureCanvas.nativeElement.getContext('2d');
    if (tempCtx) {
      const gradient = tempCtx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(255, 99, 132, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 99, 132, 0)');
      
      this.charts['temperature'] = new Chart(this.temperatureCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Température (°C)',
            data: this.chartData.temperature,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: gradient,
            fill: true,
            tension: 0.4
          }]
        },
        options: { ...commonOptions }
      });
    }

    // Graphique d'humidité (Curved line)
    this.charts['humidity'] = new Chart(this.humidityCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [{
          label: 'Humidité (%)',
          data: this.chartData.humidity,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: { ...commonOptions }
    });

    // Graphique de pression (Stepped line)
    this.charts['pressure'] = new Chart(this.pressureCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [{
          label: 'Pression (hPa)',
          data: this.chartData.pressure,
          borderColor: 'rgb(153, 102, 255)',
          stepped: true,
          tension: 0
        }]
      },
      options: { ...commonOptions }
    });

    // Graphique de qualité d'air (Doughnut)
    this.charts['airQuality'] = new Chart(this.airQualityCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Excellent', 'Bon', 'Moyen'],
        datasets: [{
          data: [70, 20, 10],
          backgroundColor: [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ]
        }]
      },
      options: {
        ...commonOptions,
        cutout: '70%'
      }
    });

    // Graphique d'énergie (Bar vertical avec gradient)
    const energyCtx = this.energyCanvas.nativeElement.getContext('2d');
    if (energyCtx) {
      const gradientEnergy = energyCtx.createLinearGradient(0, 0, 0, 400);
      gradientEnergy.addColorStop(0, 'rgba(255, 159, 64, 0.8)');
      gradientEnergy.addColorStop(1, 'rgba(255, 159, 64, 0.2)');

      this.charts['energy'] = new Chart(this.energyCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Consommation (kWh)',
            data: this.chartData.energy,
            backgroundColor: gradientEnergy,
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1
          }]
        },
        options: { ...commonOptions }
      });
    }

    // Graphique de bruit (Polar area)
    this.charts['noise'] = new Chart(this.noiseCanvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: ['Matin', 'Midi', 'Soir', 'Nuit'],
        datasets: [{
          data: [45, 55, 50, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ]
        }]
      },
      options: { ...commonOptions }
    });

    // Graphique combiné (Mixed chart)
    this.charts['combined'] = new Chart(this.combinedCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            type: 'line',
            label: 'Température (°C)',
            data: this.chartData.temperature,
            borderColor: 'rgb(255, 99, 132)',
            yAxisID: 'y1'
          },
          {
            type: 'bar',
            label: 'CO2 (ppm)',
            data: this.chartData.co2,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            yAxisID: 'y2'
          }
        ]
      },
      options: {
        ...commonOptions,
        scales: {
          y1: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y2: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false,
            },
          },
        }
      }
    });
  }

  private checkGasLevel(): void {
    const latestGasLevel = this.chartData.gas[this.chartData.gas.length - 1];
    if (latestGasLevel > this.gasThreshold) {
      this.gasNotificationVisible = true;
    }
  }

  filterByDay(): void {
    const dailyData = {
      labels: ['00h', '04h', '08h', '12h', '16h', '20h'],
      temperature: [20, 19, 21, 24, 23, 22],
      humidity: [44, 45, 47, 48, 46, 45],
      gas: [160, 155, 170, 175, 180, 170],
      pressure: [1012, 1013, 1014, 1015, 1013, 1012],
      airQuality: [92, 94, 91, 88, 90, 93],
      energy: [115, 110, 125, 130, 120, 118],
      noise: [42, 40, 50, 55, 48, 45],
      co2: [410, 400, 430, 450, 420, 405]
    };
    this.updateChartData(dailyData);
  }

  filterByWeek(): void {
    this.updateChartData(this.chartData);
  }

  private updateChartData(newData: any): void {
    Object.keys(this.charts).forEach(chartKey => {
      const chart = this.charts[chartKey];
      if (chart.data.datasets[0].data.length === newData[chartKey]?.length) {
        chart.data.labels = newData.labels;
        chart.data.datasets[0].data = newData[chartKey];
        chart.update();
      }
    });
  }
}
