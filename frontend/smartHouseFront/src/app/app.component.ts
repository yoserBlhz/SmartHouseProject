import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThermostatComponent } from '../components/thermostat/thermostat.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


  
export class AppComponent {
  title = 'smartHouseFront';
}
