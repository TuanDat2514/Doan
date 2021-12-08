import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }
  errorMessage = 'Đăng nhập thất bại';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;
  username="";
  id="";
  ngOnInit(): void {
  }
  login() {
    this.authService.login(this.loginForm.value.username,
    this.loginForm.value.password).subscribe((response)=> {
    var code=response.status;
    console.log("status code:"+code);
    if(code==200){
    this.invalidLogin = false;
    this.loginSuccess = true;
    this.successMessage = 'Login Successful.';
    this.authService.username=this.loginForm.value.username;
    this.authService.password=this.loginForm.value.password;
    this.authService.registerSuccessfulLogin(this.loginForm.value.username)
    localStorage.setItem('userId', response.body['id_user']);
    this.router.navigate(['/index']);
    }
    }, () => {
    this.invalidLogin = true;
    this.loginSuccess = false;
    });
    }
}
