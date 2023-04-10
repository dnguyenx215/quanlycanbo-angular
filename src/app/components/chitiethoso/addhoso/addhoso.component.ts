import {Component} from '@angular/core';
import {DonVi} from "../../../models/donvi";
import {DanToc} from "../../../models/dantoc";
import {TonGiao} from "../../../models/tongiao";
import {ChucVu} from "../../../models/chucvu";
import {NgachBacLuong} from "../../../models/ngachbacluong";
import {HoSoService} from "../../../services/hoso.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DonViService} from "../../../services/donvi.service";
import {ChucVuService} from "../../../services/chucvu.service";
import {NgachbacluongService} from "../../../services/ngachbacluong.service";
import {HoSo} from "../../../models/hoso";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {PhongBan} from "../../../models/phongban";
import {PhongBanService} from "../../../services/phongban.service";

@Component({
  selector: 'app-addhoso',
  templateUrl: './addhoso.component.html',
  styleUrls: ['./addhoso.component.css']
})
export class AddhosoComponent {
  public listDonVi: DonVi[] = [];
  public listDanToc: DanToc[] = [];
  public listTonGiao: TonGiao[] = [];
  public listChucVu: ChucVu[] = [];
  public listNgach: NgachBacLuong[] = [];
  maNgachSelect: string = '';
  private listHoSo: HoSo[] = [];

  ngOnInit(): void {
    this.getListHoSo();
    this.getListDonVi();
    this.getListDanToc();
    this.getListTonGiao();
    this.getListChucVu();
    this.getListNgach();

    this.setSoHieuCB();
    this.getProvinces();

    this.setDefaultDonViSelected();

  }

  constructor(private theService: HoSoService, private route: ActivatedRoute,
              private DVService: DonViService,
              private phongBanService: PhongBanService,
              private chucVuService: ChucVuService,
              private ngachService: NgachbacluongService, private router: Router) {
  }

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r))
  }

  private getListHoSo() {
    this.theService.listHoSo().subscribe(
      {
        next: (res) => {
          this.listHoSo = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  private getListDonVi() {
    this.DVService.listDonVi().subscribe(
      {
        next: (res) => {
          this.listDonVi = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  private getListDanToc() {
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

  private getListTonGiao() {
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

  private getListChucVu() {
    this.chucVuService.listChucVu().subscribe(
      {
        next: (res) => {
          this.listChucVu = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  private getListNgach() {
    this.ngachService.listNgachBacLuong().subscribe(
      {
        next: (res) => {
          this.listNgach = res;

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  onAdd(addForm: NgForm) {
    console.log(addForm.value);
    this.theService.addHoSo(addForm.value).subscribe(
      {
        next: (response: HoSo) => {
          console.log(response);
          let formData = new FormData();
          formData.append('id', response.idHoSo.toString());
          formData.append('file', this.fileUpload);
          this.theService.uploadImage(formData).subscribe({
            next: value => {
              console.log(value);
            },
            error: err => {
              console.log(err)
            }
          });
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Thêm hồ sơ thành công!", "success");
          addForm.reset();
          this.setSoHieuCB();
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 406) {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            // @ts-ignore
            this.alertHold(alertPlaceholder, "Thêm thất bại. Mã đã tồn tại!", "warning");
          }
        }
      }
    );
  }


  bacLuong: number = 1;
  heSoLuong: number = 0;
  soHieuCB: string = 'CB';
  hocHamSelected: string = 'Không';
  hocViSelected: string = 'Không';
  trinhDoGDPTSelected: string = '12/12';
  trinhDoChuyenMonSelected: string = 'Trung cấp';
  ngoaiNguSelected: string = 'Không';
  tinHocSelected: string = 'Cơ bản';
  noiSinhSelected: string = 'Hà Nội';


  public setSoHieuCB() {
    this.soHieuCB = 'CB' + Math.floor(Math.floor(10000000 + Math.random() * 90000000));
    for (const shcbElement of this.listHoSo) {
      if (shcbElement.soHieuCBCCVC === this.soHieuCB) {
        this.soHieuCB = 'CB' + Math.floor(Math.floor(10000000 + Math.random() * 90000000));
      } else {
        break;
      }
    }
  }


  public alertHold(alertPlaceholder: Element, message: String, type: String): void {
    const alert = (message: String, type: any) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" id="alert-btn-close" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
      alertPlaceholder.append(wrapper);
    }
    alert(message, type);

    const alertClose = document.getElementById('alert-btn-close');
    setTimeout(function () {
      // @ts-ignore
      alertClose.click();
    }, 1000);
  }


  setBacLuong() {
    const inputBacLuong = document.getElementById('bacLuong');
    // @ts-ignore
    inputBacLuong.value = 1;
    this.bacLuong = 1;
    this.tinhHeSo(this.maNgachSelect);
  }

  tinhHeSo(maNgach: any) {
    const inputBac = document.getElementById('bacLuong');
    const inputHeSo = document.getElementById('heSoLuong');
    let heSoArr: number[] = [];
    this.ngachService.getNgachBacLuongByID(maNgach).subscribe({
      next: (data) => {
        heSoArr.push(data.bac1);
        heSoArr.push(data.bac2);
        heSoArr.push(data.bac3);
        heSoArr.push(data.bac4);
        heSoArr.push(data.bac5);
        heSoArr.push(data.bac6);
        heSoArr.push(data.bac7);
        heSoArr.push(data.bac8);
        heSoArr.push(data.bac9);
        heSoArr.push(data.bac10);
        heSoArr.push(data.bac11);
        heSoArr.push(data.bac12);
        for (let i = 0; i < heSoArr.length; i++) {
          // @ts-ignore
          if ((this.bacLuong - 1) === i) {
            // @ts-ignore
            inputHeSo.value = heSoArr[i];
            this.heSoLuong = heSoArr[i];
          }
        }
      },
      error: err => {
      }
    });
  }

  // Khai báo một mảng rỗng để chứa tên các tỉnh thành
  provinces: string[] = [];
  public getProvinces() : void {
    // Gửi yêu cầu HTTP đến API
    const provincesJSON = '';
    fetch('../../assets/tinhthanh.json')
      .then(response => response.json())
      .then(data => {
        for (let i=0; i<=100; i++) {
          if(i < 10 && data[`0${i}`] !== undefined) {
            this.provinces.push(data[`0${i}`].name)
          }
          else if(data[i.toString()] !== undefined) {
            this.provinces.push(data[i.toString()].name)
          }
        }
      });
  }

  fileUpload : any;
  donViSelected: DonVi = new DonVi();
  phongBanSelected: PhongBan = new PhongBan();
  listPhongBan: PhongBan[] = [];
  gioiTinhSelected: any = '';
  customComparePB(o1: PhongBan, o2: PhongBan) {
    if(o1 !== null && o2 !== null) {
      return o1.maPhongBan == o2.maPhongBan;
    }
    else {
      return false;
    }
  }
  setDefaultDonViSelected() {
    this.DVService.getDonVi('BNV54').subscribe({
      next: value => {
        this.donViSelected = value;
        this.loadListPhongBan(value);
      },
      error: err => {
        console.log(err);
        this.DVService.getDonViByName('Trung tâm thông tin').subscribe({
          next: value => {
            this.donViSelected = value;
            this.loadListPhongBan(value);
          },
          error: errs => {
            console.log(errs)
          }
        })
      }
    });
  }

  customCompareDV(o1: DonVi, o2: DonVi) {
    if(o1 !== null && o2 !== null) {
      return o1.maDonVi == o2.maDonVi;
    }
    else {
      return false;
    }
  }

  getFile(event: Event) {
    // @ts-ignore
    this.fileUpload = event.target.files[0];
      console.log(this.fileUpload);
  }

  loadListPhongBan(donViSelectedChange: DonVi) {
    this.phongBanService.listPhongBanByDonVi(donViSelectedChange).subscribe({
      next: data => {
        console.log(data)
        this.listPhongBan = data;
      },
      error: err => {}
    });
  }

  protected readonly PhongBan = PhongBan;
}
