// import { CommonModule } from '@angular/common';
// import { Component, Input, OnInit } from '@angular/core';
// import { RoomService } from '../../Services/room.service';
// import { AuthService } from '../../Services/auth.service';

// @Component({
//   selector: 'app-room',
//   standalone:true,
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.scss'],
//   imports: [CommonModule],
// })
// export class RoomComponent implements OnInit {
//   rooms: any[] = [];
//   userInfo: any;

//   constructor(
//     private roomService: RoomService,
//     private authService: AuthService
//   ) {}

//   ngOnInit() {
//     this.authService.userInfo$.subscribe(userInfo => {
//       if (userInfo) {
//         this.userInfo = userInfo;
//         this.loadRooms();
//       }
//     });
//   }

//   loadRooms() {
//     this.roomService.getRooms(this.userInfo.code, this.userInfo.username).subscribe(
//       rooms => {
//         this.rooms = rooms.map(room => ({
//           ...room,
//           image: this.getImageForRoomType(room.type),
//           description: 'Loading devices...',
//           buttonText: 'Show details'
//         }));
//         this.loadDevicesForRooms();
//       },
//       error => console.error('Error loading rooms:', error)
//     );
//   }

//   loadDevicesForRooms() {
//     this.rooms.forEach(room => {
//       this.roomService.getDevices(this.userInfo.code,this.userInfo.username, room.name).subscribe(
//         devices => {
//           room.description = `${devices.length} devices connected`;
//         },
//         error => {
//           console.error(`Error loading devices for ${room.name}:`, error);
//           room.description = 'Unable to load devices';
//         }
//       );
//     });
//   }

//   getImageForRoomType(type: string): string {
//     switch (type.toLowerCase()) {
//       case 'bedroom':
//         return 'assets/room.jpg';
//       case 'salon':
//       case 'living room':
//         return 'assets/livingRoom.jpg';
//       default:
//         return 'assets/room.jpg';
//     }
//   }




// }

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RoomService } from '../../Services/room.service';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  standalone: true,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [CommonModule],
})
export class RoomComponent implements OnInit, OnChanges {
  @Input() rooms: any[] = [];
  userInfo: any;

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo => {
      if (userInfo) {
        this.userInfo = userInfo;
        // this.processRooms();
        this.loadRooms();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rooms']) {
      this.processRooms();
    }
  }
    loadRooms() {
    this.roomService.getRooms(this.userInfo.code).subscribe(
      rooms => {
        this.rooms = rooms.map(room => ({
          ...room,
          image: this.getImageForRoomType(room.type),
          description: 'Loading devices...',
          buttonText: 'Show details'
        }));
        this.loadDevicesForRooms();
      },
      error => console.error('Error loading rooms:', error)
    );
  }

  processRooms() {
    this.rooms = this.rooms.map(room => ({
      ...room,
      image: this.getImageForRoomType(room.type),
      description: 'Loading devices...',
      buttonText: 'Show details'
    }));
    this.loadDevicesForRooms();
  }

  loadDevicesForRooms() {
    this.rooms.forEach(room => {
      this.roomService.getDevices(this.userInfo.code, this.userInfo.username, room.name).subscribe(
        devices => {
          room.description = `${devices.length} devices connected`;
        },
        error => {
          console.error(`Error loading devices for ${room.name}:`, error);
          room.description = 'Unable to load devices';
        }
      );
    });
  }

   getImageForRoomType(type: string): string {
    switch (type.toLowerCase()) {
      case 'bedroom':
        return 'assets/room.jpg';
      case 'bathroom':
        return 'assets/bathroom.jpg';
      case 'livingroom':
        return 'assets/livingRoom.jpg';
      case 'kitchen':
        return 'assets/kitchen.jpg';
      default:
        return 'assets/room.jpg';
    }
  }

  navigateToDevices(room: any) {
    this.router.navigate(['/devices'], { 
      queryParams: { 
        roomName: room.name,
        roomType: room.type
      }
    });
  }
  
}