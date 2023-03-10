import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DbData } from '../models/dbData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<DbData>(this.url + '/login', {email, password});
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('id_token');
    if(token) {
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return expiry * 1000 > Date.now();
    }
    return false;
  }

}
