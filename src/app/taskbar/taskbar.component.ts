import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService,User,Wallet } from '../data.service';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
 // @ViewChild(LoginComponent)
 // private userLogin: LoginComponent;

  user=this.authService.getLoggedInUserName();
 
  constructor(private authService: AuthService,private router: Router,private dataService: DataService) { }
  
  ngOnInit(): void {
   
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  id:any
  tabChange(ids:any){
    this.id=ids;
    this.router.navigate(['/'+this.id])
  }

  
  
}
