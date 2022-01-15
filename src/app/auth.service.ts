import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './data.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_PATH = 'http://localhost:8080'
  USER_NAME_SESSION = 'username_session'
  ID_USER='id_user'
  public username: String;
  public password: String;
  public id: any;
  results: string[];
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    var params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<Response>(this.BASE_PATH + "/auth/login", params, {observe: 'response'});
  }
  
  register(user: String, pass: String, fullname: String, phonenumber: number, role: String) {
    return this.http.post<Response>(this.BASE_PATH + "/auth/register", { username: user, password: pass, fullname: fullname, phonenumber: phonenumber, role: role }, { observe: 'response' });
  }
  createBasicAuthToken() {
    console.log(this.username + ":" + this.password);
    return 'Basic ' + window.btoa(this.username + ":" + this.password)
  }
  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION, username)
  }
  SetID(id) {
    localStorage.setItem(this.ID_USER, id)
  }
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION);
    this.username = null;
    this.password = null;
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION)
    if (user === null) return false
    return true
  }
  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION)
    if (user === null) return ''
    return user
  }
  getId() {
    let id= localStorage.getItem(this.ID_USER)
    if (id === null) return ''
    return id;
  }
  getMoney(){
    const moneyobj=localStorage.getItem('user');
    let abc=JSON.parse(moneyobj||'{}').wallet;
    return abc.money;
  }
 
}
