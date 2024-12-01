import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  temperature: number = 21;
  humidity :number=20;
  gasLevel:number=400;

  // Method to adjust temperature
  adjustTemperature(change: number): void {
    this.temperature += change;
  }

  devices = [
    {
      name: 'Smart Light',
      image: '/images/devices/light.png',
      isOn: false,
    },
    {
      name: 'Smart Thermostat',
      image: '/images/devices/thermostat.png',
      isOn: true,
    },
    {
      name: 'Smart Plug',
      image: '/images/devices/plug.png',
      isOn: false,
    },
    {
      name: 'Smart Fan',
      image: '/images/devices/fan.png',
      isOn: true,
    },
  ];

  // Search query for filtering
  searchQuery = '';

  // Getter to filter devices based on search query
  get filteredDevices() {
    return this.devices.filter((device) =>
      device.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Toggle device on/off state
  toggleDevice(device: any): void {
    device.isOn = !device.isOn;
  }
}
