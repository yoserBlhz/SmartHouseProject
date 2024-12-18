import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/api'; 

  constructor(private http: HttpClient) { }

  addRoom(code: string, username: string, roomData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/${code}/${username}/add-room`, roomData);
  }

  // getRooms(code: string, username: string): Observable<any[]> {
  //   return this.http.get<any>(`${this.apiUrl}/${code}/${username}/getRooms`)
  //     .pipe(
  //       map(response => response[0].HOME)
  //     );
  // }
  getRooms(code: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${code}/getRooms`)
      .pipe(
        map(response => response[0].HOME)
      );
  }

  getDevices(code:String ,username: string, roomName: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${code}/${username}/${roomName}/getDevices`)
      .pipe(
        map(response => response.devices)
      );
  }

  updateDeviceState(code: string, username: string, deviceId: string, action: 'on' | 'off'): Observable<any> {
    return this.http.post(`${this.apiUrl}/${username}/${deviceId}/${action}`, {});
  }

  deleteDevice(code: string, username: string, roomName: string, deviceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${username}/${roomName}/${deviceId}/deleteAppareil`);
  }

  addDevice(code: string, username: string, roomName: string, deviceType: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${username}/${roomName}/addAppareil`, { type: deviceType });
  }

  deleteRoom(code:String ,username: string,roomName: string): Observable<any> {
    const url = `${this.apiUrl}/${code}/${username}/delete-room/${roomName}`;
    return this.http.delete(url);
  }
  


}


