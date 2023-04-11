import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ChitietquatrinhdaotaoboiduongComponent
} from "./components/chitiethoso/chitietquatrinhdaotaoboiduong/chitietquatrinhdaotaoboiduong.component";
import {HomeComponent} from "./components/home/home.component";
import {DonviComponent} from "./components/donvi/donvi.component";
import {SignComponent} from "./components/sign/sign.component";
import {ChucvuComponent} from "./components/chucvu/chucvu.component";
import {NgachbacluongComponent} from "./components/ngachbacluong/ngachbacluong.component";
import {HesongachbacluongComponent} from "./components/hesongachbacluong/hesongachbacluong.component";
import {ChitiethosoComponent} from "./components/chitiethoso/chitiethoso.component";
import {AddhosoComponent} from "./components/chitiethoso/addhoso/addhoso.component";
import {BangluongComponent} from "./components/bangluong/bangluong.component";
import {ThongtintaikhoanComponent} from "./components/thongtintaikhoan/thongtintaikhoan.component";
import {QuanlytaikhoanComponent} from "./components/quanlytaikhoan/quanlytaikhoan.component";
import {DoimatkhauComponent} from "./components/thongtintaikhoan/doimatkhau/doimatkhau.component";
import {DantocComponent} from "./components/danhmucphu/dantoc/dantoc.component";
import {TongiaoComponent} from "./components/danhmucphu/tongiao/tongiao.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HinhthuckhenthuongComponent} from "./components/hinhthuckhenthuong/hinhthuckhenthuong.component";
import {HinhThucKyLuatComponent} from "./components/hinhthuckyluat/hinhthuckyluat.component";
import {PhongbanComponent} from "./components/phongban/phongban.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AuthGuard} from "./services/auth.guard";
import { NgxPaginationModule } from 'ngx-pagination';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import {FusionChartsModule} from "angular-fusioncharts";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DonviComponent,
    SignComponent,
    ChucvuComponent,
    NgachbacluongComponent,
    HesongachbacluongComponent,
    ChitiethosoComponent,
    AddhosoComponent,
    BangluongComponent,
    ThongtintaikhoanComponent,
    QuanlytaikhoanComponent,
    DoimatkhauComponent,
    DantocComponent,
    TongiaoComponent,
    DashboardComponent,
    HinhthuckhenthuongComponent,
    HinhThucKyLuatComponent,
    PhongbanComponent,
    ChitietquatrinhdaotaoboiduongComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FusionChartsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
