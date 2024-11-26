 import { Component, EventEmitter, Output } from '@angular/core';
 import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() toggle = new EventEmitter<boolean>();
  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    this.toggle.emit(this.isSidebarClosed);
  }
}
