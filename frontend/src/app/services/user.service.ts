import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

const apiUrl = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId!: number;

  constructor(private http: HttpClient) { }

  getUserId(id: number): Observable<User> {
    return this.http.get<User>(apiUrl + "/" + id);
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl);
  };

  deleteUser(id: number): Observable<any>{
    return this.http.delete(apiUrl + "/" + id);
  }

  addUser(User: User): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", User.name);
    bodyEncoded.append("password", User.password);
    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);
  }

  updateUser(id: number, User: User): Observable<any>{
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("name", User.name);
    bodyEncoded.append("password", User.password);
    let body = bodyEncoded.toString(); 
    return this.http.put(apiUrl + "/" + id, body, httpOptions);
  }

}
