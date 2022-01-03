import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataService, Detail,User } from '../data.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  public CURRENCY: string;

  newForm = this.fb.group({
    detail: [''],
    date: [''],
    category:[''],
    price: [''],
    note: [''],
    username:[this.authService.getLoggedInUserName()],
  });
  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router,private authService: AuthService) { }
  message:string;
  currency:any;
  user=this.authService.getLoggedInUserName();
  users:any;
  ngOnInit(): void {
    this.CURRENCY = 'CURRENCY';
  }
  onSubmit() {
    const userId =localStorage.getItem('userId');
    console.log(userId);
    let detail = { id: "", detail: "", date: "",category:"", price: "", note: "", status: 0, username:"",id_user:userId};
    detail.detail = this.newForm.value.detail;
    detail.date = this.newForm.value.date;
    detail.category = this.newForm.value.category;
    detail.price = this.newForm.value.price;
    detail.note = this.newForm.value.note;
    detail.username = this.newForm.value.username;
    let code = 0;
    this.dataService.addDetail(detail).subscribe(response => {
      code = response.status;
      console.log("status code:" + code);
      if (code == 200) {
        this.message="Bạn thêm thành công";
      }
    }
    );
  }
  onChangeReactiveForm(key: string) {
    this.newForm.get(key).patchValue(this.newForm.get(key).value);
    }
    
      
      
}


