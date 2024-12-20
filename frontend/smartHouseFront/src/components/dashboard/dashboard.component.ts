import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule, NgFor } from '@angular/common';
import { RoomComponent } from '../room/room.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../Services/room.service';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RoomComponent, NavbarComponent,NgFor,FormsModule,ReactiveFormsModule, HttpClientModule],
  providers: [AuthService,RoomService],  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  isSidebarClosed = false;

  handleSidebarToggle(isClosed: boolean) {
    this.isSidebarClosed = isClosed;
  }
  roomForm!: FormGroup;
  userInfo: { code: string, username: string } | null = null;
  @ViewChild('addRoomModal') addRoomModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private roomService: RoomService,
    private router: Router
  ) {}

    devices = [
      { type: 'light', label: 'Light' },
      { type: 'fan', label: 'Fan' },
      { type: 'ac', label: 'Air Conditioner' },
      { type: 'tv', label: 'Television' }
    ];
  

  
    initForm() {
      this.roomForm = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        light: [false],
        fan: [false],
        ac: [false],
        tv: [false]
      });
    }
  


  
  
    ngOnInit() {
      this.initForm();
      this.authService.userInfo$.subscribe(userInfo => {
        this.userInfo = userInfo;
        if (!userInfo) {
          this.router.navigate(['/login']);
        }
      });
    }
  

    saveRoom() {
      if (this.roomForm.valid && this.userInfo) {
        const formValue = this.roomForm.value;
        const appareils = this.devices
          .filter(device => formValue[device.type])
          .map(device => ({ type: device.type }));
  
        const roomData = {
          name: formValue.name,
          type: formValue.type,
          appareils: appareils
        };
  
        this.roomService.addRoom(this.userInfo.code, this.userInfo.username, roomData).subscribe({
          next: (response) => {
            console.log('Room added successfully', response);
            document.getElementById('addRoomModal')?.classList.remove('show');
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop')?.remove();
          },
          error: (error) => {
            console.error('Error adding room', error);
          }
        });
      }
    }




}
