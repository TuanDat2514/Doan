import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService,User,Wallet } from '../data.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  constructor(private authService:AuthService,private dataService:DataService) { }
  money=this.authService.getMoney();
  ngOnInit(): void {
    
  }
  
  
}
