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
 
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  userInfo: { code: string, username: string } | null = null;
 constructor(
    private authService: AuthService,
   
  ) {}
  ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo => {
      this.userInfo = userInfo;
    });
  }
}
