import { Component,  Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule,MatToolbarModule,MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 
}
