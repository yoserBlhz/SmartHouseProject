import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = 'http://localhost:5000/api'; 
  
    constructor(private http: HttpClient) { }
  
    addUser(code: string, username: string, userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/${code}/${username}/addOtherUsers`, userData);
    }
    
    getUsers(code: string, username: string): Observable<any[]> {
      return this.http.get<any>(`${this.apiUrl}/${code}/${username}/getOtherUsers`)
        .pipe(
          map(response => response[0].otherUsers)
        );
    }
  
    editUser(code: string, username: string, userId: string, userData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${code}/${username}/editOtherUser/${userId}`, userData);
    }
  
    deleteUser(code: string, username: string, userId: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${code}/${username}/deleteOtherUser/${userId}`);
    }
}
