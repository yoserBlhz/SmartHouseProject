import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';


interface UserInfo {
  code: string;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api';
  //private userInfo: { code: string, username: string } | null = null;

  // constructor(private http: HttpClient) { }

  signup(userData: any): Observable<any> {
    console.log("d5al ");
    return this.http.post(`${this.apiUrl}/addAdmin`, userData);
  }

  // signin(credentials: { username: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/Login`, credentials);
  // }

  // signin(credentials: { username: string, password: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/Login`, credentials).pipe(
  //     tap((response: any) => {
  //       if (response.code && response.username) {
  //         this.userInfo = { code: response.code, username: response.username };
  //         console.log("userINFO!!")
  //         console.log(this.userInfo);
  //       }
  //     })
  //   );
  // }
  // getUserInfo(): { code: string, username: string } {
  //   if (!this.userInfo) {
  //     throw new Error('User not logged in');
  //   }
  //   return this.userInfo;
  // }
  



  private userInfoSubject: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

  constructor(private http: HttpClient) {
    this.checkStoredUserInfo();
  }

  private checkStoredUserInfo(): void {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      this.userInfoSubject.next(JSON.parse(storedUserInfo));
    }
  }

  signin(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials).pipe(
      tap((response: any) => {
        if (response.code && response.username) {
          const userInfo = { code: response.code, username: response.username };
          this.userInfoSubject.next(userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      })
    );
  }
  join(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${credentials.username}/${credentials.password}/LoginSimpleuser`,credentials).pipe(
      tap((response: any) => {
        if (response.code && response.username) {
          const userInfo = { code: response.code, username: response.username };
          this.userInfoSubject.next(userInfo);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      })
    );
  }

  signout(): void {
    this.userInfoSubject.next(null);
    localStorage.removeItem('userInfo');
  }

  getUserInfo(): UserInfo | null {
    return this.userInfoSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.userInfoSubject.value;
  }

  get userInfo$(): Observable<UserInfo | null> {
    return this.userInfoSubject.asObservable();
  }





}
