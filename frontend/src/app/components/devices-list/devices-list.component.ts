import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-devices-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.scss'
})
export class DevicesListComponent {
  
  deleteItem(){}
  dataSource = [
    {
      imagePath: 'images/devices/webcam-fill.svg', 
      uname: 'Camera', 
      priority: 'off', 
    },
    {
      imagePath: 'images/devices/fan.svg',
      uname: 'Fan',
      priority: 'off',
    },
    {
      imagePath: 'images/devices/lightbulb-fill.svg',
      uname: 'Lamp',
      priority: 'on',
    }
  ];

  temperature: number = 22; // Exemple de température en °C
  humidity: number = 45; // Exemple d'humidité en %
  gasLevel: string = "Normal";  
}
