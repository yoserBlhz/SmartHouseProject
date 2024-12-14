import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../Services/room.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-room',
  standalone:true,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [CommonModule],
})
export class RoomComponent implements OnInit {
  // rooms = [
  //   {
  //     name: 'Kitchen',
  //     image: 'assets/kitchen.jpg',
  //     description: '3 devices connected',
  //     buttonText: 'Show details'
  //   },
  //   {
  //     name: 'Living Room',
  //     image: 'assets/room.jpg',
  //     description: '5 devices connected',
  //     buttonText: 'Show details'
  //   },
  //   {
  //     name: 'Bedroom',
  //     image: 'assets/livingRoom.jpg',
  //     description: '2 devices connected',
  //     buttonText: 'Show details'
  //   }
  // ];

  rooms: any[] = [];
  userInfo: any;

  constructor(
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userInfo$.subscribe(userInfo => {
      if (userInfo) {
        this.userInfo = userInfo;
        this.loadRooms();
      }
    });
  }

  loadRooms() {
    this.roomService.getRooms(this.userInfo.code, this.userInfo.username).subscribe(
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

  loadDevicesForRooms() {
    this.rooms.forEach(room => {
      this.roomService.getDevices(this.userInfo.code,this.userInfo.username, room.name).subscribe(
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
      case 'salon':
      case 'living room':
        return 'assets/livingRoom.jpg';
      default:
        return 'assets/room.jpg';
    }
  }




}
