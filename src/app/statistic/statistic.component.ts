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
    endDate: [''],
    year: ['']
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
  dataInchartBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  chartPie;
  chartBar;
  getDetailbyDate() {
    let startDate = new Date(this.formDate.value.startDate);
    var sdate = new Intl.DateTimeFormat("ja-JP").format(startDate);
    let endDate = new Date(this.formDate.value.endDate);
    var edate = new Intl.DateTimeFormat("ja-JP").format(endDate);
    let username = this.authService.getLoggedInUserName();

    //details
    this.dataService.getDetailbyDate(username, sdate, edate).subscribe((data: Array<Detail>) => {
      this.details = data;
      var sum = 0;
      var sumSpend = 0
      for (var i = 0; i < data.length; i++) {
        if (data[i].status == 0) {
          sum += data[i].price;
        }

        else {
          sumSpend += data[i].price;
        }
      }
      this.sumIn = sum;
      this.sumSpend = sumSpend;
    });
    //data chart spend
    this.dataService.getDataSpendChart(username, sdate, edate).subscribe((data: number[]) => {
      this.dataSpendchart = data;
      if (this.chart == null) {
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: [['Xăng dầu'], ['Giải trí'], ['Điện nước'], 'Du lịch'],
            datasets: [{
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
      }
      else {
        this.chart.destroy();
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: [['Xăng dầu'], ['Giải trí'], ['Điện nước'], 'Du lịch'],
            datasets: [{
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
      }

    });
    //data chart income
    this.dataService.getDataIncomeChart(username, sdate, edate).subscribe((data: number[]) => {
      this.dataIncomechart = data;
      if (this.chartIn == null) {
        this.chartIn = new Chart('canvasIn', {
          type: 'pie',
          data: {
            labels: [['Lương'], 'Thưởng'],
            datasets: [{
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
      }
      else {
        this.chartIn.destroy();
        this.chartIn = new Chart('canvasIn', {
          type: 'pie',
          data: {
            labels: [['Lương'], 'Thưởng'],
            datasets: [{
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
      }

    });
  }
  getChartBar() {
    let year = this.formDate.value.year;
    let username = this.authService.getLoggedInUserName();
    var dataInBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var dataSpendBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    //data chart Bar
    this.dataService.getDataIncomeChartBar(username, year).subscribe((data: number[]) => {
      for (var i = 0; i < data.length; i++) {
        if (data[0][2] = 1) {
          switch (data[i][1]) {
            case 1:
              dataInBar[0] = data[i][0];
              break;
            case 2:
              dataInBar[1] = data[i][0];
              break;
            case 3:
              dataInBar[2] = data[i][0];
              break;
            case 4:
              dataInBar[3] = data[i][0];
              break;
            case 5:
              dataInBar[4] = data[i][0];
              break;
            case 6:
              dataInBar[5] = data[i][0];
              break;
            case 7:
              dataInBar[6] = data[i][0];
              break;
            case 8:
              dataInBar[7] = data[i][0];
              break;;
            case 9:
              dataInBar[8] = data[i][0];
              break;
            case 10:
              dataInBar[9] = data[i][0];
              break;
            case 11:
              dataInBar[10] = data[i][0];
              break;
            case 12:
              dataInBar[11] = data[i][0];
              break;
          }
        } else {
          switch (data[i][1]) {
            case 1:
              dataSpendBar[0] = data[i][0];
              break;
            case 2:
              dataSpendBar[1] = data[i][0];
              break;
            case 3:
              dataSpendBar[2] = data[i][0];
              break;
            case 4:
              dataSpendBar[3] = data[i][0];
              break;
            case 5:
              dataSpendBar[4] = data[i][0];
              break;
            case 6:
              dataSpendBar[5] = data[i][0];
              break;
            case 7:
              dataSpendBar[6] = data[i][0];
              break;
            case 8:
              dataSpendBar[7] = data[i][0];
              break;;
            case 9:
              dataSpendBar[8] = data[i][0];
              break;
            case 10:
              dataSpendBar[9] = data[i][0];
              break;
            case 11:
              dataSpendBar[10] = data[i][0];
              break;
            case 12:
              dataSpendBar[11] = data[i][0];
              break;
          }
        }
      }
      console.log(dataInBar);
      console.log(dataSpendBar);
      //draw chart
    });
  }
}

