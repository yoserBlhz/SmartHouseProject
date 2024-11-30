import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thermostat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './thermostat.component.html',
  styleUrl: './thermostat.component.scss'
})
export class ThermostatComponent {
  temperature = 22; // Température initiale
  mode: 'heating' | 'cooling' | 'dry' = 'heating'; // Mode par défaut
  humidity = 60; // Humidité par défaut

  // Change le mode (chauffage, refroidissement, sec)
  setMode(newMode: 'heating' | 'cooling' | 'dry') {
    this.mode = newMode;
  }

  // Définit une humidité spécifique
  setHumidity(value: number) {
    this.humidity = value;
  }
}
