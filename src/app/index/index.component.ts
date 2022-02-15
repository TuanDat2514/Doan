import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService,Detail,User,Wallet } from '../data.service';
import { DetailComponent } from '../detail/detail.component';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(private authService:AuthService,private dataService:DataService) { }
  ngOnInit(): void {
    this.getWallet();
    this.getSum();
  }
  wallet;
  money;
  sumIn;
  sumSpend;
  username=this.authService.getLoggedInUserName();
  getWallet(){
    const userId =localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data:Wallet)=>{
      this.wallet=data;
      this.money=this.wallet.money;
    })
  }
  getSum(){
    this.dataService.getListDetail(this.username).subscribe(data=>{
      var sum = 0;
      var sumSpend = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {
          sum += data[i].price;
        }

        else {
          sumSpend += data[i].price;
        }
      }
      this.sumIn = sum;
      this.sumSpend = sumSpend;
    })
  }
}
