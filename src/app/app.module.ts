import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { IncomeComponent } from './income/income.component';
import { SpendComponent } from './spend/spend.component';

import { DetailComponent } from './detail/detail.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { NgxFormatFieldModule } from 'ngx-format-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './http-interceptor.service';
import { StatisticComponent } from './statistic/statistic.component'

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'index', component: IndexComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'spend', component: SpendComponent },
  { path: 'statistic', component: StatisticComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    IncomeComponent,
    SpendComponent,
    DetailComponent,
    TaskbarComponent,
    StatisticComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFormatFieldModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
