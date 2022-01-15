import { Component, OnInit } from '@angular/core';
import { DataService,Detail} from '../data.service';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { ChartOptions, ChartType,ChartData } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  formDate = this.fb.group({
    startDate:[''],
    endDate:['']
  });
  constructor(private fb: FormBuilder,private dataService: DataService,private authService: AuthService) { }
  sumIn;
  sumSpend;
  ngOnInit(): void {
    
  }
  details;
  getDetailbyDate(){
    let startDate = new Date(this.formDate.value.startDate); 
    var sdate= new Intl.DateTimeFormat("ja-JP").format(startDate);
    let endDate= new Date(this.formDate.value.endDate);
    var edate = new Intl.DateTimeFormat("ja-JP").format(endDate);
    let username=this.authService.getLoggedInUserName();
    this.dataService.getDetailbyDate(username,sdate,edate).subscribe((data:Array<Detail>)=>this.details=data)
  }
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'TuanDat' ], [ 'dat' ], 'tuan' ],
    datasets: [ {
      data: [ 300, 500, 100 ]
    } ]
  };

  chartOptions = {
    responsive: true
  };
  public pieChartData1: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Giải trí' ], [ 'Du lịch' ], 'Xăng xe' ],
    datasets: [ {
      data: [ 100, 200, 300 ],
      backgroundColor: [
        'black',
        'green',
        'yellow'     
    ],
  
    } ]
  
  };
}


