import { Component, OnInit } from '@angular/core';
import { DataService, Detail } from '../data.service';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
import { ChartOptions, ChartType, ChartData, Chart } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  formDate = this.fb.group({
    startDate: [''],
    endDate: ['']
  });
  constructor(private fb: FormBuilder, private dataService: DataService, private authService: AuthService) { }
  sumIn;
  sumSpend;
  showMe: boolean;
  ngOnInit(): void {

  }
  details;
  dataSpendchart;
  dataIncomechart;
  chart;
  chartIn;
  getDetailbyDate() {
    let startDate = new Date(this.formDate.value.startDate);
    var sdate = new Intl.DateTimeFormat("ja-JP").format(startDate);
    let endDate = new Date(this.formDate.value.endDate);
    var edate = new Intl.DateTimeFormat("ja-JP").format(endDate);
    let username = this.authService.getLoggedInUserName();
    //details
    this.dataService.getDetailbyDate(username, sdate, edate).subscribe((data: Array<Detail>) => this.details = data);
    //data chart spend
    this.dataService.getDataSpendChart(username, sdate, edate).subscribe((data:number[]) =>{
      this.dataSpendchart = data;
      console.log(this.dataSpendchart);
      this.chart = new Chart('canvas', {
        type: 'pie',
        data: {
          labels: [ ['Xăng dầu'], ['Giải trí'], ['Điện nước'],'Du lịch'],
          datasets: [ {
            data: this.dataSpendchart,
            backgroundColor: [
              '#fe6a6a',
              '#fc4242',
              '#ff1919',
              '#e40000',
              '#c10000'    
          ],
          }]
        },
        options: {
          responsive: true
        }
      })
    }); 
    //data chart income
    this.dataService.getDataIncomeChart(username, sdate, edate).subscribe((data:number[]) =>{
      this.dataIncomechart = data;
      console.log(this.dataIncomechart);
      this.chartIn = new Chart('canvasIn', {
        type: 'pie',
        data: {
          labels: [ ['Lương'],'Thưởng'],
          datasets: [ {
            data: this.dataIncomechart,
            backgroundColor: [
              '#3a79d8',
              '#2e76e2',
              '#116df6',
              '#0090ff'
                
          ],
          }]
        },
        options: {
          responsive: true
        }
      })
    }); 

  }
}


