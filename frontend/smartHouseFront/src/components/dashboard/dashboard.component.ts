import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,SidebarComponent, NavbarComponent,RoomComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidebarClosed = false;

  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }
}
