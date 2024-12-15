import { Component, OnInit  } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


  
export class AppComponent {
  /*isSidebarCollapsed = false;
  showLayout = true;
  sidebarOpen = false;


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
   
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
       
        const noLayoutRoutes = ['/signin', '/signup','/'];
        this.showLayout = !noLayoutRoutes.includes(event.url);
      }
    });
  }*/
}
