import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from "../navbar/navbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../../Services/room.service';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router'; // Importez Router


interface Device {
  name: string;
  isOn: boolean;
  id: string;
}

interface UserInfo {
  code: string;
  username: string;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    NavbarComponent,
    SidebarComponent,
    HttpClientModule,
  ],
  providers: [AuthService, RoomService],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit, OnDestroy {
dataSource: MatTableDataSource<Device>;
temperature: number = 21;
humidity: number = 20;
gasLevel: number = 400;
searchQuery: string = '';
isSidebarClosed: boolean = false;
roomName: string = '';
roomType: string = '';
userInfo: UserInfo | null = null;
private subscriptions: Subscription[] = [];

devices: Device[] = [];
displayedColumns: string[] = ['name', 'isOn', 'actions'];
existingDeviceTypes: string[] = ['Light', 'Fan', 'AC', 'TV', 'Speaker'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(
  private route: ActivatedRoute,
  private roomService: RoomService,
  private authService: AuthService,
  private dialog: MatDialog,
  private router: Router 

) {
  this.dataSource = new MatTableDataSource<Device>([]);
}

ngOnInit() {
  const routeSub = this.route.queryParams.subscribe(params => {
    this.roomName = params['roomName'];
    this.roomType = params['roomType'];
  });
  this.subscriptions.push(routeSub);

  const authSub = this.authService.userInfo$.subscribe(userInfo => {
    this.userInfo = userInfo;
    if (userInfo && this.roomName) {
      this.loadDevices();
    }
  });
  this.subscriptions.push(authSub);
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

ngOnDestroy() {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

loadDevices() {
  if (!this.userInfo || !this.roomName) return;

  this.roomService.getDevices(this.userInfo.code, this.userInfo.username, this.roomName)
    .subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        if (Array.isArray(response)) {
          this.devices = response.map(device => ({
            name: device.type,
            isOn: device.bouton === 1,
            id: device._id
          }));
          this.dataSource.data = this.devices;
          console.log('Processed devices:', this.devices);
        } else {
          console.warn('Invalid response format:', response);
          this.devices = [];
          this.dataSource.data = [];
        }
      },
      error: (error) => {
        console.error('Error loading devices:', error);
        this.devices = [];
        this.dataSource.data = [];
      }
    });
}

toggleDevice(device: Device) {
  if (!this.userInfo || !this.roomName) return;

  const newState = device.isOn ? 'off' : 'on';
  
  this.roomService.updateDeviceState(
    this.userInfo.code,
    this.userInfo.username,
    device.id,
    newState
  ).subscribe({
    next: (response) => {
      console.log('Device state updated:', response);
      device.isOn = !device.isOn;
      this.dataSource.data = [...this.devices];
    },
    error: (error) => {
      console.error('Error updating device state:', error);
    }
  });
}

deleteDevice(device: Device) {
  if (!this.userInfo || !this.roomName) return;

  this.roomService.deleteDevice(
    this.userInfo.code,
    this.userInfo.username,
    this.roomName,
    device.id
  ).subscribe({
    next: (response) => {
      console.log('Device deleted:', response);
      this.devices = this.devices.filter(d => d.id !== device.id);
      this.dataSource.data = [...this.devices];
    },
    error: (error) => {
      console.error('Error deleting device:', error);
    }
  });
}

openAddDeviceDialog() {
  const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
    width: '300px',
    data: { existingDeviceTypes: this.existingDeviceTypes }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addDevice(result);
    }
  });
}

addDevice(deviceType: string) {
  if (!this.userInfo || !this.roomName) return;

  this.roomService.addDevice(
    this.userInfo.code,
    this.userInfo.username,
    this.roomName,
    deviceType
  ).subscribe({
    next: (response) => {
      console.log('Device added:', response);
      this.loadDevices(); // Reload devices after adding
    },
    error: (error) => {
      console.error('Error adding device:', error);
    }
  });
}

handleSidebarToggle(isClosed: boolean) {
  this.isSidebarClosed = isClosed;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.searchQuery = filterValue;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

adjustTemperature(change: number): void {
  this.temperature += change;
}

roomToDelete: string | null = null;

confirmDelete(roomName: string) {
  this.roomToDelete = roomName;
}
deleteRoom2() {
  if (confirm(`Are you sure you want to delete the room "${this.roomName}"?`)) {

    if (!this.userInfo || !this.roomName) return;

    this.roomService.deleteRoom(
      this.userInfo.code,
      this.userInfo.username,
      this.roomName,
    ).subscribe(
      (response) => {
        console.log('Room deleted successfully:', response);
        this.router.navigate(['/dashboard']); // Redirigez vers une autre page après suppression
      },
      (error) => {
        console.error('Error deleting room:', error);
      }
    );
  }
}
deleteRoom() {
  if (this.userInfo && this.roomToDelete) {
    this.roomService.deleteRoom(
      this.userInfo.code,
      this.userInfo.username,
      this.roomToDelete,
    ).subscribe(
      (response) => {
        console.log('Room deleted successfully:', response);
        document.getElementById('deleteRoomModal')?.classList.remove('show');
          document.body.classList.remove('modal-open');
         document.querySelector('.modal-backdrop')?.remove();
         this.roomToDelete = null;
        this.router.navigate(['/dashboard']); // Redirigez vers une autre page après suppression
      },
      (error) => {
        console.error('Error deleting room:', error);
      }
    );
  }
}



}

@Component({
selector: 'app-add-device-dialog',
styleUrls: ['./test.component.scss'],
template: `
  <h2 mat-dialog-title>Add Device</h2>
  <div mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>Select Device Type</mat-label>
      <mat-select [(ngModel)]="selectedDeviceType">
        <mat-option *ngFor="let type of data.existingDeviceTypes" [value]="type">
          {{type}}
        </mat-option>
        <mat-option value="custom">Custom Device</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field *ngIf="selectedDeviceType === 'custom'" appearance="fill">
      <mat-label>Custom Device Type</mat-label>
      <input matInput [(ngModel)]="customDeviceType">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button  class="btn btn-custom2" (click)="onNoClick()">Cancel</button>
    <button  class="btn btn-custom" [mat-dialog-close]="getSelectedDeviceType()" cdkFocusInitial>Add</button>
  </div>
`,
standalone: true,
imports: [
  CommonModule,
  FormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule
]
})
export class AddDeviceDialogComponent {
selectedDeviceType: string = '';
customDeviceType: string = '';

constructor(
  public dialogRef: MatDialogRef<AddDeviceDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {existingDeviceTypes: string[]}
) {}

onNoClick(): void {
  this.dialogRef.close();
}

getSelectedDeviceType(): string {
  return this.selectedDeviceType === 'custom' ? this.customDeviceType : this.selectedDeviceType;
}
}

