import {Component} from '@angular/core';
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

// @ts-ignore
// @ts-ignore
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
  dataTrinhDoChuyenMon: any[] = [];
  listTaiKhoan: Taikhoan[] = [];
  dataSource: any;

  constructor(private theService: HoSoService, private router: Router, private tkService: TaikhoanService,
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
    this.getDataTrinhDoChuyenMon();
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

          // data trinh do chuyen mon
          this.setDataDSTrinhDoChuyenMon(res);
          this.chartTDChuyenMonOption();


          },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public setDataDSTrinhDoChuyenMon(dshs: HoSo[]) {
    let tdSoCap = 0;
    let tdTrungCap = 0;
    let tdCaoDang = 0;
    let tdDaiHoc = 0;
    let tdCaoHoc = 0;
    let tdTienSi = 0;

    for (let hoSo of dshs) {
      console.log('hoso ngaysinh: ' + hoSo.ngaySinh)
      if (hoSo.trinhDoChuyenMon == 'Sơ cấp') {
        tdSoCap++;
      }
      if (hoSo.trinhDoChuyenMon == 'Trung cấp') {
        tdTrungCap++;
      }
      if (hoSo.trinhDoChuyenMon == 'Cao đẳng') {
        tdCaoDang++;
      }
      if (hoSo.trinhDoChuyenMon == 'Đại học') {
        tdDaiHoc++;
      }
      if (hoSo.trinhDoChuyenMon == 'Cao học') {
        tdCaoHoc++;
      }
      if (hoSo.trinhDoChuyenMon == 'Tiến sĩ') {
        tdTienSi+= 1;
        console.log(tdTienSi)
      }
    }
    this.dataTrinhDoChuyenMon = [
      {
        label: 'Sơ cấp',
        value: tdSoCap.toString()
      },
      {
        label: 'Trung cấp',
        value: tdTrungCap.toString()
      },
      {
        label: 'Cao đẳng',
        value: tdCaoDang.toString()
      },
      {
        label: 'Đại học',
        value: tdDaiHoc.toString()
      },
      {
        label: 'Cao học',
        value: tdCaoHoc.toString()
      },
      {
        label: 'Tiến sĩ',
        value: tdTienSi.toString()
      },
    ];
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

  getDataTrinhDoChuyenMon() {

  }

  chartTDChuyenMonOption() {

    // Chart Configuration
    this.dataSource = {
      chart: {
        //Set the chart caption
        caption: "Thống kê theo trình độ chuyên môn",
        //Set the chart subcaption
        // subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Trình độ",
        //Set the y-axis name
        yAxisName: "Số lượng",
        // numberSuffix: "K",
        //Set the theme for your chart
        theme: "fusion",
        decimals: "0",
      },
      // Chart Data
      data: this.dataTrinhDoChuyenMon
    };
  }


}
