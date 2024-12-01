// import { Component, Input } from '@angular/core';

// @Component({
//   standalone: true,
//   selector: 'app-room',
//   templateUrl: './room.component.html',
//   styleUrls: ['./room.component.scss']
// })
// export class RoomComponent {
//   @Input() roomName: string = 'Default Room'; 
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone:true,
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  imports: [CommonModule],
})
export class RoomComponent {
  rooms = [
    {
      name: 'Kitchen',
      image: 'assets/kitchen.jpg',
      description: '3 devices connected',
      buttonText: 'Show details'
    },
    {
      name: 'Living Room',
      image: 'assets/room.jpg',
      description: '5 devices connected',
      buttonText: 'Show details'
    },
    {
      name: 'Bedroom',
      image: 'assets/livingRoom.jpg',
      description: '2 devices connected',
      buttonText: 'Show details'
    }
  ];
}
