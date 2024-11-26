import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 name: string | undefined;
  pic: string | undefined;
  
  currentDate: string = '';

  constructor(private router:Router) {
  }
  ngOnInit() {
    this.updateDate();

  }


  updateDate(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    this.currentDate = now.toLocaleDateString('fr-FR', options);
  }

  loadUserInfo() {
    if (typeof sessionStorage !== 'undefined') {
      const loginUser = JSON.parse(sessionStorage.getItem("loginuser")!);
      if (loginUser) {
        this.name = loginUser.name;
      }
    }
  }
  
  logOut() {
    sessionStorage.clear();
    window.history.replaceState({}, '', '/');
   // this.router.navigate(['/']);
   //this.authService.logout(); 
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    
  }

















}

