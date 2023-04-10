import { Component } from '@angular/core';
import {PhongBan} from "../../models/phongban";
import {PhongBanService} from "../../services/phongban.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {DonVi} from "../../models/donvi";
import {DonViService} from "../../services/donvi.service";

@Component({
  selector: 'app-phongban',
  templateUrl: './phongban.component.html',
  styleUrls: ['./phongban.component.css']
})
export class PhongbanComponent {
  public listPhongBan: PhongBan[] = [];
  public listDonVi: DonVi[] = [];
  public editPhongBan: PhongBan | undefined;
  public deletePhongBan: PhongBan | undefined;
  public keyId: number = 0;

  p: number = 1;
  protected ten: string = '';

  constructor(private theService: PhongBanService,
              private dvService: DonViService) {

  }

  ngOnInit(): void {
    this.getListDonVi();
    this.setDefaultDonViSelected();
    this.getListPhongBan();
    this.onChangeDonVi(this.donViSelected);
  }

  public getListPhongBan(): void {
    this.theService.listPhongBan().subscribe(
      {
        next: data=> {
          console.log(data);
          this.listPhongBan = data;
        },
        error: err => {}
      }
    );
  }

  public getListDonVi(): void {
    this.dvService.listDonVi().subscribe(
      (res: DonVi[]) => {
        this.listDonVi = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addPhongBan(addForm.value).subscribe(
      (response: PhongBan) => {
        console.log(response);
        // this.getListPhongBan();
        this.onChangeDonVi(this.donViSelected);

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        if (response != null) {
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Sucessfully added!", "success");
        } else {
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Add Failed!", "warning");
        }
        this.p = Math.ceil((this.listPhongBan.length + 1) / 5);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 204) {
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Thêm thất bại. Mã đã tồn tại!", "warning");
        }
      //  addForm.reset();
      }
    );
  }

  public onUpdate(obj: PhongBan): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updatePhongBan(this.keyId, obj).subscribe(
      (response: PhongBan) => {
        console.log(response);
      //  this.getListPhongBan();
        this.onChangeDonVi(this.donViSelected);
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Update successfully!", "info");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDelete(keyId: number): void {
    // @ts-ignore
    document.getElementById('delete-form-btn-no').click();
    this.theService.deletePhongBan(keyId).subscribe(
      (response: void) => {
        console.log(response);
      //  this.getListPhongBan();
        this.onChangeDonVi(this.donViSelected);
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Delete successfully!", "danger");
        this.p = Math.ceil((this.listPhongBan.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchName(): void {
    this.theService.searchPhongBanByName(this.ten).subscribe(
      (res: PhongBan[]) => {
        this.listPhongBan = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public refresh(): void {
    this.getListPhongBan();
    this.ten = '';
  }


  public onOpenModalAdd(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
      this.setDefaultDonViSelected();
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenEditOrDeleteModal(obj: PhongBan, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editPhongBan = obj;
      this.keyId = obj.maPhongBan;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deletePhongBan = obj;
      this.keyId = obj.maPhongBan;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
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
    }, 1200);
  }


  mapb: any;
  donViSelected: DonVi = new DonVi();
  maDV: any;
  phongBanSelected: any;

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
            this.onChangeDonVi(this.donViSelected);
          },
          error: errs => {
            console.log(errs);
          }
        });
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

  setMaPB(mdv : number) : void {
    this.mapb = mdv + Math.floor(Math.random() * 100);
    for (const itemdv of this.listPhongBan) {
      if(itemdv.maPhongBan === this.mapb) {
        this.mapb = mdv + Math.floor(Math.random() * 100);
      }
      else {
        break;
      }
    }
  }

  getSelectDonVi(maDV: any) {

  }

  onChangeDonVi(donViSelectedChange: DonVi) {
    console.log('dvselectchange: ' + donViSelectedChange);
    this.theService.listPhongBanByDonVi(donViSelectedChange).subscribe({
      next: data => {
        this.listPhongBan = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  private getListPhongBanByDV(donViSelected: DonVi) {
      this.theService.listPhongBanByDonVi(donViSelected).subscribe({
        next: tdata => {
          this.listPhongBan = tdata;
        },
        error: errs => {}
      });
  }
}
