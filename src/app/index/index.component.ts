import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService, Detail, User, Wallet } from '../data.service';
import { DetailComponent } from '../detail/detail.component';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(private authService: AuthService, private dataService: DataService, private fb: FormBuilder) { }
  form = this.fb.group({
    id_wallet: [''],
    money: ['']
  })
  ngOnInit(

  ): void {
    this.getWallet();
  }
  message;
  wallet;
  money;
  sumIn;
  sumSpend;
  showMe: boolean;
  username = this.authService.getLoggedInUserName();

  getWallet() {
    const userId = localStorage.getItem('userId');
    this.dataService.getWallet(userId).subscribe((data: Wallet) => {
      this.wallet = data;
      this.money = this.wallet.money;
      if (this.money == 0 || this.money < 0) {
        this.showMe = false;
      } else {
        this.showMe = true;
      }
    })
  }
  onSubmit() {
    let code;
    const userId = localStorage.getItem('userId');
    let wallet = { id_wallet: userId, money: "" };
    wallet.money = this.form.value.money;
    this.dataService.updateWallet(wallet).subscribe(
      (response) => { },
      error => {
        code = error.status;
        console.log("status code:" + code);
        if (code == 303)
          this.message="Thêm thành công";
      }
    );
    console.log(wallet);
  }
}
