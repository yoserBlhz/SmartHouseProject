 import { Component, EventEmitter, Output } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isSidebarClosed = false; // État initial de la barre latérale
  currentRoute = ''; // Stocke la route active

  constructor(private router: Router) {
    // Met à jour la route active à chaque changement
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  toggleSidebar(): void {
    this.isSidebarClosed = !this.isSidebarClosed; // Bascule entre les états
  }
}

//edhe cmnt bch ijik