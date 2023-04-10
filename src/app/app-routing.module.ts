import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignComponent} from "./components/sign/sign.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {ThongtintaikhoanComponent} from "./components/thongtintaikhoan/thongtintaikhoan.component";
import {HomeComponent} from "./components/home/home.component";
import {DonviComponent} from "./components/donvi/donvi.component";
import {ChucvuComponent} from "./components/chucvu/chucvu.component";
import {NgachbacluongComponent} from "./components/ngachbacluong/ngachbacluong.component";
import {HesongachbacluongComponent} from "./components/hesongachbacluong/hesongachbacluong.component";
import {ChitiethosoComponent} from "./components/chitiethoso/chitiethoso.component";
import {BangluongComponent} from "./components/bangluong/bangluong.component";
import {AddhosoComponent} from "./components/chitiethoso/addhoso/addhoso.component";
import {QuanlytaikhoanComponent} from "./components/quanlytaikhoan/quanlytaikhoan.component";
import {DoimatkhauComponent} from "./components/thongtintaikhoan/doimatkhau/doimatkhau.component";
import {DantocComponent} from "./components/danhmucphu/dantoc/dantoc.component";
import {TongiaoComponent} from "./components/danhmucphu/tongiao/tongiao.component";
import {HinhthuckhenthuongComponent} from "./components/hinhthuckhenthuong/hinhthuckhenthuong.component";
import {HinhThucKyLuatComponent} from "./components/hinhthuckyluat/hinhthuckyluat.component";
import {PhongbanComponent} from "./components/phongban/phongban.component";
import {
  ChitietquatrinhdaotaoboiduongComponent
} from "./components/chitiethoso/chitietquatrinhdaotaoboiduong/chitietquatrinhdaotaoboiduong.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: SignComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'my-account', component: ThongtintaikhoanComponent, canActivate: [AuthGuard]},
  {path: 'manage', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'donvi', component: DonviComponent, canActivate: [AuthGuard]},
  {path: 'chucvu', component: ChucvuComponent, canActivate: [AuthGuard]},
  {path: 'ngach', component: NgachbacluongComponent, canActivate: [AuthGuard]},
  {path: 'hesongach', component: HesongachbacluongComponent, canActivate: [AuthGuard]},
  {path: 'chitiethoso/:id', component: ChitiethosoComponent, canActivate: [AuthGuard]},
  {path: 'ds-luong', component: BangluongComponent, canActivate: [AuthGuard]},
  {path: 'addhoso', component: AddhosoComponent, canActivate: [AuthGuard]},
  {path: 'manage-account', component: QuanlytaikhoanComponent, canActivate: [AuthGuard]},
  {path: 'change-passwd', component: DoimatkhauComponent, canActivate: [AuthGuard]},
  {path: 'dan-toc', component: DantocComponent, canActivate: [AuthGuard]},
  {path: 'ton-giao', component: TongiaoComponent, canActivate: [AuthGuard]},
  {path: 'hinh-thuc-khen-thuong', component: HinhthuckhenthuongComponent, canActivate: [AuthGuard]},
  {path: 'hinh-thuc-ky-luat', component: HinhThucKyLuatComponent, canActivate: [AuthGuard]},
  {path: 'phongban', component: PhongbanComponent, canActivate: [AuthGuard]},
  {path: 'chi-tiet-qua-trinh-dao-tao-boi-duong/:id', component: ChitietquatrinhdaotaoboiduongComponent, canActivate: [AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
