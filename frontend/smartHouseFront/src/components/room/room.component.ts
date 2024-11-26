import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  @Input() roomName: string = 'Default Room'; 
}
