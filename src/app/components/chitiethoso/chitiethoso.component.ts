import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChucVu} from "../../models/chucvu";
import {HoSoService} from "../../services/hoso.service";
import {HoSo} from "../../models/hoso";
import {DonViService} from "../../services/donvi.service";
import {ChucVuService} from "../../services/chucvu.service";
import {DonVi} from "../../models/donvi";
import {DanToc} from "../../models/dantoc";
import {TonGiao} from "../../models/tongiao";
import {NgachBacLuong} from "../../models/ngachbacluong";
import {NgachbacluongService} from "../../services/ngachbacluong.service";
import {DomSanitizer} from "@angular/platform-browser";
import {PhongBan} from "../../models/phongban";
import {PhongBanService} from "../../services/phongban.service";


@Component({
  selector: 'app-chitiethoso',
  templateUrl: './chitiethoso.component.html',
  styleUrls: ['./chitiethoso.component.css']
})
export class ChitiethosoComponent {
  getidParams: any = '';
  fileUpload : any;
  public loadHoSo: HoSo = new HoSo();
  public listDonVi: DonVi[] = [];
  public listPhongBan: PhongBan[] = [];
  public listDanToc: DanToc[] = [];
  public listTonGiao: TonGiao[] = [];
  public listChucVu: ChucVu[] = [];
  public listNgach: NgachBacLuong[] = [];
  provinces: string[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getidParams = params['id'];
      this.getHoSo(this.getidParams);

    });
    this.getListDonVi();
    this.getListDanToc();
    this.getListTonGiao();
    this.getListChucVu();
    this.getListNgach();
    this.getProvinces();
    this.loadImageURL(this.getidParams);
  }

  constructor(private theService: HoSoService, private route: ActivatedRoute,
              private DVService: DonViService, private phongBanService: PhongBanService,
              private chucVuService: ChucVuService, private sanitizer: DomSanitizer,
              private ngachService: NgachbacluongService, private router: Router) {
  }


  public getHoSo(param: any): void {
    this.theService.getHoSo(param).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadHoSo = res;
          this.getListPhongBan(res.donVi);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getProvinces(): void {
    // Gửi yêu cầu HTTP đến API
    const provincesJSON = '';
    fetch('../../assets/tinhthanh.json')
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i <= 100; i++) {
          if (i < 10 && data[`0${i}`] !== undefined) {
            this.provinces.push(data[`0${i}`].name)
          } else if (data[i.toString()] !== undefined) {
            this.provinces.push(data[i.toString()].name)
          }
        }
      });
  }

  public getListDonVi(): void {
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

        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public onUpdate(obj: HoSo): void {

    this.theService.updateHoSo(this.getidParams, obj).subscribe({
        next: (res) => {
          console.log(res);
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Cập nhật thành công!", "info");
        },
        error: (err) => {
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Cập nhật thất bại!", "warning");
          console.log(err.message);
        }
      }
    );
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

  tinhHeSo(maNgach: string, bac: number) {
    const inputBac = document.getElementById('in-bac-luong');
    // @ts-ignore
    console.log(inputBac.value);
    const inputHeSo = document.getElementById('he-so-luong');
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
          if ((bac - 1) === i) {
            // @ts-ignore
            inputHeSo.value = heSoArr[i];
            this.loadHoSo.heSoLuong = heSoArr[i];
          }
        }
      },
      error: err => {
      }
    });
  }

  setBacLuong() {
    const inputBacLuong = document.getElementById('in-bac-luong');
    this.tinhHeSo(this.loadHoSo.maNgach, this.loadHoSo.bacLuong);
  }

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r))
  }

  imgURL: any = '';
  imagePath: any = '';

  loadImageURL(idHoSo: any): void {
    this.theService.getFileData(idHoSo).subscribe({
      next: (value) => {
        console.log(value);
        let blob: Blob = value.body as Blob;
        // this.imgURL = window.URL.createObjectURL(blob);
        this.imgURL = "http://localhost:8009/api/hoso/open/" + idHoSo;
        this.sanitizer.bypassSecurityTrustResourceUrl(this.imgURL);
      },
      error: err => {
        console.log(err);
      }
    });
    console.log(this.imgURL)
  }

  onChangeImage(event: Event) {
    // @ts-ignore
    this.loadHoSo.imageUrl = event.target.files[0];
    const imgElement = document.getElementById("img-canbo");
    let formData = new FormData();
    formData.append('id', this.getidParams);
    formData.append('file', this.loadHoSo.imageUrl);
    this.theService.uploadImage(formData).subscribe({
      next: value => {
        console.log(value)
        this.loadImageURL(this.getidParams);
        // @ts-ignore
        imgElement.src = this.imgURL;
      },
      error: err => {
        console.log(err.message)
      }
    })
  }



  customCompareDV(o1: DonVi, o2: DonVi) {
    if(o1 !== null && o2 !== null) {
      return o1.maDonVi == o2.maDonVi;
    }
    else {
      return false;
    }
  }

  customComparePB(o1: PhongBan, o2: PhongBan) {
    if(o1 !== null && o2 !== null) {
      return o1.maPhongBan == o2.maPhongBan;
    }
    else {
      return false;
    }
  }
  getFile(event: Event) {
    // @ts-ignore
    let file = event.target.files[0];
    if (file.type !== 'application/pdf') {
      alert("vui lòng chọn tệp pdf")
    } else {
      this.fileUpload = file;
      console.log(this.fileUpload);
    }
  }

  public getListPhongBan(dv : DonVi) {
    this.phongBanService.listPhongBanByDonVi(dv).subscribe({
      next: data => {
        this.listPhongBan = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }


}
