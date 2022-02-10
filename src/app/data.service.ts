import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
export interface Detail {
  id_detail: number;
  detail: string;
  date: Date;
  category:string;
  price: number;
  note: string;
  status: number;
}
export interface User {
  username: String;
  password: String;
  id:number;
  fullname:String;
  SDT:Number;
}
export interface Wallet{
  idWallet:number;
  money:number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
 
  rootURL = "http://localhost:8080";
  constructor(private http: HttpClient,private authService:AuthService) { }
  getListDetail(username): Observable<Array<Detail>> {
    return this.http.get<Array<Detail>>(this.rootURL + "/detail/all/"+username);
  }
  addDetail(detail) {
    return this.http.post<Response>(this.rootURL + "/detail/add", detail, {
      observe: 'response'});
  }
  getUserName(username):Observable<User> {
    return this.http.get<User>(this.rootURL+"/user/get?username="+username)
  }
  deleteDetail(id:any) {
    return this.http.delete(this.rootURL + "/detail/delete/" + id);
    }
  getWallet(id_wallet:any):Observable<Wallet>{
    return this.http.get<Wallet>(this.rootURL+"/wallet/get/"+id_wallet);
  }
  getDetailbyDate(username,date1,date2): Observable<Array<Detail>>{
    return this.http.get<Array<Detail>>(this.rootURL + "/detail/all/get/"+username+"?startDate="+date1+"&endDate="+date2);
  }
  getDataSpendChart(username,date1,date2): Observable<Number[]>{ 
    return this.http.get<Number[]>(this.rootURL + "/detail/category/spend/"+username+"?startDate="+date1+"&endDate="+date2);
  }
  getDataIncomeChart(username,date1,date2): Observable<Number[]>{ 
    return this.http.get<Number[]>(this.rootURL + "/detail/category/income/"+username+"?startDate="+date1+"&endDate="+date2);
  }

}
