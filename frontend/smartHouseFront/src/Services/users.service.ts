import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    private apiUrl = 'http://localhost:5000/api'; 
  
    constructor(private http: HttpClient) { }
  
    addUser(code: string, username: string, userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/${code}/${username}/addOtherUsers`, userData);
    }
}
