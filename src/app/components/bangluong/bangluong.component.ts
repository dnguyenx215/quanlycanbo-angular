import {Component, Inject} from '@angular/core';
import {HoSo} from "../../models/hoso";
import {DonVi} from "../../models/donvi";
import {HoSoService} from "../../services/hoso.service";
import {DonViService} from "../../services/donvi.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgachbacluongService} from "../../services/ngachbacluong.service";
import {NgachBacLuong} from "../../models/ngachbacluong";
import {formatNumber} from "@angular/common";
import { LOCALE_ID, NgModule } from '@angular/core';
import {Router} from "@angular/router";
import {PhongBanService} from "../../services/phongban.service";
import {PhongBan} from "../../models/phongban";

@Component({
  selector: 'app-bangluong',
  templateUrl: './bangluong.component.html',
  styleUrls: ['./bangluong.component.css']
})
export class BangluongComponent {
  public listHoSo: HoSo[] = [];
  public editHoSo: HoSo  = new HoSo();
  public keyId: number = 0;

  protected ten: string = '';
  listDonVi: DonVi[] = [];
  maDV: any;
  p: number = 0;
  private maxSizepagi: number = 10;
  donViSelected: DonVi = new DonVi();
  listPhongBan: PhongBan[] = [];
  phongBanSelected: PhongBan = new PhongBan();

  constructor(private theService: HoSoService,
              private dvService: DonViService, private pbService: PhongBanService,
              private router : Router,
              private ngachService: NgachbacluongService, @Inject(LOCALE_ID) public locale: string) {}

  ngOnInit(): void {
    this.setDefaultDonViSelected();
    this.getListDonVi();
    this.getListHoSo();
  }

  public getListHoSo(): void {
    this.theService.listHoSo().subscribe(
      {
        next: (res: HoSo[]) => {
          this.listHoSo = res;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.statusText);
        }
      }
    );
  }

  public getListDonVi(): void {
    this.dvService.listDonVi().subscribe(
      {
        next: (res: DonVi[]) => {
          this.listDonVi = res;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.statusText);
        }
      }
    );
  }

  public getSelectDonVi(madv : string): void {
    this.theService.listHoSoByDonVi(madv).subscribe({
      next : value => {
        this.listHoSo = value;
      },
      error : (err: HttpErrorResponse) => {

      }
    })
  }

  public searchName(): void {
    this.theService.listHoSoByName(this.ten).subscribe(
      (res: HoSo[]) => {
        console.log(res);
        this.listHoSo = res;
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public refresh(): void {
    this.getListHoSo();
    this.ten = '';
    // @ts-ignore
    document.getElementById('select-don-vi').value = '';
  }


  public onOpenEditOrDeleteModal(obj: HoSo, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editHoSo = obj;
      this.keyId = obj.idHoSo;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public getMucLuong(heSo : number): string {
    let mucLuong = 1490000 * heSo;
    return formatNumber(mucLuong, this.locale , '0.0');
  }


  public onUpdate(eobj: HoSo): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateHoSoMucLuong(eobj.bacLuong, eobj.heSoLuong, eobj.idHoSo).subscribe(
      (response: number) => {
        console.log(eobj.bacLuong, eobj.heSoLuong, eobj.idHoSo);
        // this.getListHoSo();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Update successfully!", "info");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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


  tinhHeSo(maNgach : string) {
    const inputBac = document.getElementById('Input3Edit');
    const inputHeSo = document.getElementById('Input4Edit');
    let heSoArr : number[] = [];
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
        for(let i = 0; i<heSoArr.length; i++) {
          // @ts-ignore
          if((inputBac.value - 1) === i) {
                // @ts-ignore
            inputHeSo.value = heSoArr[i];
            this.editHoSo.heSoLuong = heSoArr[i];
          }
        }
      },
      error : err => {}
    });

  }

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r));
  }

  onChangeDonVi(donViSelectedChange: DonVi) {
    console.log('dvselectchange: ' + donViSelectedChange);
    this.pbService.listPhongBanByDonVi(donViSelectedChange).subscribe({
      next: data => {
        this.listPhongBan = data;
      },
      error: err => {
        console.log(err)
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

  loadHoSoByPhongBan(phongBanSelected: PhongBan) {
    console.log(phongBanSelected);
    this.theService.listHoSoByPhongBan(phongBanSelected.maPhongBan).subscribe({
      next: data => {
        this.listHoSo = data;
      },
      error: ers => {}
    });
  }

  setDefaultDonViSelected() {
    this.dvService.getDonVi('BNV54').subscribe({
      next: value => {
        this.donViSelected = value
        console.log('dv value: ' + value.maDonVi);
        this.onChangeDonVi(this.donViSelected);
      },
      error: err => {
        console.log(err);
        this.dvService.getDonViByName('Trung tâm thông tin').subscribe({
          next: vdata => {
            this.donViSelected = vdata;
            this.maDV = vdata.maDonVi;
            this.onChangeDonVi(this.donViSelected);
          },
          error: errs => {
            console.log(errs);
          }
        });
      }
    });
  }





}
