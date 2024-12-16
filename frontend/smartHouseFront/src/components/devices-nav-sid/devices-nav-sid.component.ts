import { Component } from '@angular/core';
import { TestComponent } from '../test/test.component';
@Component({
  selector: 'app-devices-nav-sid',
  standalone: true,
  imports: [TestComponent ],
  templateUrl: './devices-nav-sid.component.html',
  styleUrl: './devices-nav-sid.component.scss'
})
export class DevicesNavSidComponent {

}
