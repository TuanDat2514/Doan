import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { DataService,Wallet } from '../data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(private authService:AuthService,private dataService:DataService) { }

  ngOnInit(): void {
  }
  wallets=this.authService.getLoggedInUserName();
  wallet;
  getMoney(){
    const userId =localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data:Wallet)=>this.wallet=data.money)
  }
}
