import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }
  message:String;
  registerForm = this.fb.group({
    username: [''],
    password: [''],
    fullname:[''],
    phonenumber:[''],
    role: ['USER']
  });
  ngOnInit(): void {
  }
  register() {
    this.authService.register(this.registerForm.value.username,this.registerForm.value.password, this.registerForm.value.fullname,this.registerForm.value.phonenumber,this.registerForm.value.role).subscribe(response=> {
        var code = response.status;
        if (code == 201)
        this.message="Đăng ký thành công";
        else {
          this.message="Đăng ký thất bại";
        }
      }
      );
  }
}
