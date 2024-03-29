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
  sumInYear;
  sumSpendYear;
  showMe: boolean;
  ngOnInit(): void {
    this.year1 = this.selectyear();
  }
  details;
  dataSpendchart;
  dataIncomechart;
  chart;
  chartIn;
  dataInchartBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  chartBar;
  detailsInYear;
  year1;
  selected: number;
  selectyear() {
    let syear = 2018;
    var year = new Array();
    for (var i = 0; i < 16; i++) {
      year[i] = syear;
      syear++;
    }
    return year;
  }
  selectChangeHandler(event: any) {

    this.selected = event.target.value;
  }
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
    
    //draw chart pie
    this.dataService.getDataSpendChart(username, sdate, edate).subscribe((data: number[]) => {
      this.dataSpendchart = data;
      
      var dataSpendPie = new Array(0, 0, 0, 0, 0, 0, 0);
      for (var i = 0; i < data.length; i++) {
        switch (data[i][1]) {
          case 1:
            dataSpendPie[0] = data[i][0];
            break;
          case 2:
            dataSpendPie[1] = data[i][0];
            break;
          case 3:
            dataSpendPie[2] = data[i][0];
            break;
          case 4:
            dataSpendPie[3] = data[i][0];
            break;
          case 5:
            dataSpendPie[4] = data[i][0];
            break;
          case 6:
            dataSpendPie[5] = data[i][0];
            break;
          case 7:
            dataSpendPie[6] = data[i][0];
            break;
        }
        console.log(dataSpendPie);
      }
      if (this.chart == null) {
        this.chart = new Chart('canvas', {
          type: 'pie',
          data: {
            labels: [['Xăng dầu'], ['Giải trí'], ['Điện nước'], ['Du lịch'], ['Sức khỏe'], ['Giáo dục'], 'Shopping'],
            datasets: [{
              data: dataSpendPie,
              backgroundColor: [
                '#fe6a6a',
                '#fc4242',
                '#ff1919',
                '#e40000',
                '#c10000',
                '#a70202',
                '#910101',
                '#964564'
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
            labels: [['Xăng dầu'], ['Giải trí'], ['Điện nước'], ['Du lịch'], ['Sức khỏe'], ['Giáo dục'], 'Shopping'],
            datasets: [{
              data: dataSpendPie,
              backgroundColor: [
                '#fe6a6a',
                '#fc4242',
                '#ff1919',
                '#e40000',
                '#c10000',
                '#a70202',
                '#910101'
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
      var dataInPie = new Array(0, 0, 0, 0);
      for (var i = 0; i < data.length; i++) {
        switch (data[i][1]) {
          
          case 10:
            dataInPie[0] = data[i][0];
            break;
          case 11:
            dataInPie[1] = data[i][0];
            break;
          case 12:
            dataInPie[2] = data[i][0];
            break;
          case 13:
            dataInPie[3] = data[i][0];
            break;
        }
      }
      if (this.chartIn == null) {
        this.chartIn = new Chart('canvasIn', {
          type: 'pie',
          data: {
            labels: [['Lương'], ['Thưởng'], ['Được tặng'], 'Bản đồ'],
            datasets: [{
              data: dataInPie,
              backgroundColor: [
                '#0261ff',
                '#0050d4',
                '#013892',
                '#002665',
                '#5c99ff'
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
            labels: [['Lương'], ['Thưởng'], ['Được tặng'], 'Bản đồ'],
            datasets: [{
              data: dataInPie,
              backgroundColor: [
                '#0261ff',
                '#0050d4',
                '#013892',
                '#002665',
                '#5c99ff'
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
    let username = this.authService.getLoggedInUserName();
    var dataInBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    var dataSpendBar = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    //get detail
    this.dataService.getDetailbyYear(username, this.selected).subscribe((data: Array<Detail>) => {
      this.detailsInYear = data;
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
      this.sumInYear = sum;
      this.sumSpendYear = sumSpend;
    });
    //data chart Bar
    this.dataService.getDataChartBar(username, this.selected).subscribe((data: number[]) => {
      this.dataInchartBar = data;
      for (var i = 0; i < data.length; i++) {
        if (data[i][2] == 0) {
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
        console.log(this.dataInchartBar[i][2]);
      }
      console.log(dataInBar);
      console.log(dataSpendBar);

      //draw chart
      if (this.chartBar == null) {
        this.chartBar = new Chart('chartBar', {
          type: 'bar',
          data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              { data: dataSpendBar, label: 'Chi tiêu' },
              { data: dataInBar, label: 'Thu Nhập' }

            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {},
              y: {
                min: 10
              }
            },
            plugins: {
              legend: {
                display: true,
              }
            }
          }
        })
      } else {
        this.chartBar.destroy();
        this.chartBar = new Chart('chartBar', {
          type: 'bar',
          data: {
            labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            datasets: [
              { data: dataSpendBar, label: 'Chi tiêu' },
              { data: dataInBar, label: 'Thu nhập ' }
            ]
          },
          options: {
            responsive: true,
            scales: {
              x: {},
              y: {
                min: 10
              }
            },
            plugins: {
              legend: {
                display: true,
              }
            }
          }
        })
      }

    });
  }
}

