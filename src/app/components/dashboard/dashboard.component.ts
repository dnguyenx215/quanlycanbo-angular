import { Component } from '@angular/core';
import {HoSoService} from "../../services/hoso.service";
import {DonViService} from "../../services/donvi.service";
import {Router} from "@angular/router";
import {ChucVuService} from "../../services/chucvu.service";
import {NgachbacluongService} from "../../services/ngachbacluong.service";
import {DanToc} from "../../models/dantoc";
import {DonVi} from "../../models/donvi";
import {TonGiao} from "../../models/tongiao";
import {ChucVu} from "../../models/chucvu";
import {NgachBacLuong} from "../../models/ngachbacluong";
import {HoSo} from "../../models/hoso";
import {Taikhoan} from "../../models/taikhoan";
import {TaikhoanService} from "../../services/taikhoan.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  listDanToc: DanToc[] = [];
   listDonVi: DonVi[] = [];
   listTonGiao: TonGiao[] = [];
   listChucVu: ChucVu[] = [];
   listNgach: NgachBacLuong[] = [];
   listHoSo: HoSo[] = [];
   listTaiKhoan: Taikhoan[] = [];

  constructor(private theService: HoSoService, private router : Router, private tkService : TaikhoanService,
              private DVService: DonViService, private chucVuService: ChucVuService,
              private ngachService: NgachbacluongService) {
  }
  ngOnInit(): void {
    this.getListHoSo();
    this.getListDonVi();
    this.getListDanToc();
    this.getListTonGiao();
    this.getListChucVu();
    this.getListNgach();
    this.getListTaiKhoan();
  }
  hoSoCount: number = 0;
  donViCount: number = 0;
  chucVuCount: number = 0;
  ngachCount: number = 0;
  taiKhoanCount: number = 0;

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r));

  }

  public getListHoSo(): void {
    this.theService.listHoSo().subscribe(
      {
        next: (res) => {
          this.listHoSo = res;
          this.hoSoCount = res.length;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }
  public getListDonVi(): void {
    this.DVService.listDonVi().subscribe(
      {
        next: (res) => {
          this.listDonVi = res;
          this.donViCount = res.length;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListDanToc(): void {
    this.theService.listDanToc().subscribe(
      {
        next: (res) => {
          this.listDanToc = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListTonGiao(): void {
    this.theService.listTonGiao().subscribe(
      {
        next: (res) => {
          this.listTonGiao = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListChucVu(): void {
    this.chucVuService.listChucVu().subscribe(
      {
        next: (res) => {
          this.listChucVu = res;
          this.chucVuCount = res.length;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListNgach(): void {
    this.ngachService.listNgachBacLuong().subscribe(
      {
        next: (res) => {
          this.listNgach = res;
          this.ngachCount = res.length;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListTaiKhoan(): void {
    this.tkService.listTaiKhoan().subscribe(
      {
        next: (res) => {
          this.listTaiKhoan = res;
          this.taiKhoanCount = res.length;
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

}
