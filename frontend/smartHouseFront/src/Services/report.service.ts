// report.service.ts
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  getTemperatureData(): ChartData<'line'> {
    return {
      labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
      datasets: [
        {
          label: 'Temperature',
          data: [22, 24, 21, 23, 25, 22, 24],
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };
  }

  getHumidityData(): ChartData<'line'> {
    return {
      labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
      datasets: [
        {
          label: 'Humidity',
          data: [60, 62, 58, 61, 64, 59, 63],
          borderColor: 'rgb(54, 162, 235)',
          tension: 0.1
        }
      ]
    };
  }

  getGasData(): ChartData<'bar'> {
    return {
      labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7'],
      datasets: [
        {
          label: 'Gas Level',
          data: [300, 450, 400, 550, 420, 480, 380],
          backgroundColor: 'rgb(75, 192, 192)'
        }
      ]
    };
  }

  getTemperatureDataByDay(): ChartData<'line'> {
    // Implement logic to retrieve temperature data by day
    return this.getTemperatureData();
  }

  getHumidityDataByDay(): ChartData<'line'> {
    // Implement logic to retrieve humidity data by day
    return this.getHumidityData();
  }

  getGasDataByDay(): ChartData<'bar'> {
    // Implement logic to retrieve gas data by day
    return this.getGasData();
  }

  getTemperatureDataByWeek(): ChartData<'line'> {
    // Implement logic to retrieve temperature data by week
    return this.getTemperatureData();
  }

  getHumidityDataByWeek(): ChartData<'line'> {
    // Implement logic to retrieve humidity data by week
    return this.getHumidityData();
  }

  getGasDataByWeek(): ChartData<'bar'> {
    // Implement logic to retrieve gas data by week
    return this.getGasData();
  }
}