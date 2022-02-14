import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService,Detail,User,Wallet } from '../data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(private authService:AuthService,private dataService:DataService) { }
  
  ngOnInit(): void {
    this.getWallet();
    
  }
  wallet;
  money;
  getWallet(){
    const userId =localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data:Wallet)=>{
      this.wallet=data;
      this.money=this.wallet.money;
    })
  }
 
}
