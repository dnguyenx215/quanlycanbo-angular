import {Component} from '@angular/core';

import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {QuaTrinhDaoTaoBoiDuong} from "../../../models/quatrinhdaotaoboiduong";
import {QuaTrinhDaoTaoBoiDuongService} from "../../../services/quatrinhdaotaoboiduong.service";
import {HoSo} from "../../../models/hoso";
import {ActivatedRoute} from "@angular/router";
import {HoSoService} from "../../../services/hoso.service";
import {ChucVuService} from "../../../services/chucvu.service";

@Component({
  selector: 'app-chitietquatrinhdaotaoboiduong',
  templateUrl: './chitietquatrinhdaotaoboiduong.component.html',
  styleUrls: ['./chitietquatrinhdaotaoboiduong.component.css']
})
export class ChitietquatrinhdaotaoboiduongComponent {
  public listQuaTrinhDaoTaoBoiDuong: QuaTrinhDaoTaoBoiDuong[] = [];
  public editQuaTrinhDaoTaoBoiDuong: QuaTrinhDaoTaoBoiDuong = new QuaTrinhDaoTaoBoiDuong();
  public deleteQuaTrinhDaoTaoBoiDuong: QuaTrinhDaoTaoBoiDuong = new QuaTrinhDaoTaoBoiDuong();
  public keyId: number = 0;

  p: number = 1;
  private getidParams: any;
  loadHoSo: HoSo = new HoSo();

  constructor(private theService: QuaTrinhDaoTaoBoiDuongService,
              private hoSoService: HoSoService, private chucVuService: ChucVuService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getidParams = params['id'];
      this.getHoSo(this.getidParams);
    });

  }

  public getHoSo(param: any): void {
    this.hoSoService.getHoSo(param).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.loadHoSo = res;
          this.getListQuaTrinhDaoTaoBoiDuong(res);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  public getListQuaTrinhDaoTaoBoiDuong(hoSo: HoSo): void {
    this.theService.listQuaTrinhDaoTaoBoiDuongByHoSo(hoSo.idHoSo).subscribe(
      (res: QuaTrinhDaoTaoBoiDuong[]) => {
        this.listQuaTrinhDaoTaoBoiDuong = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addQuaTrinhDaoTaoBoiDuong(addForm.value).subscribe(
      (response: QuaTrinhDaoTaoBoiDuong) => {
        console.log(response);
        this.getListQuaTrinhDaoTaoBoiDuong(this.loadHoSo);
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Thêm thành công!", "success");
        this.p = Math.ceil((this.listQuaTrinhDaoTaoBoiDuong.length + 1) / 5);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 406) {

          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Thêm thất bại. Mã đã tồn tại!", "warning");
        }
        addForm.reset();
      }
    );
  }

  public onUpdate(obj: QuaTrinhDaoTaoBoiDuong): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateQuaTrinhDaoTaoBoiDuong(this.keyId, obj).subscribe(
      (response: QuaTrinhDaoTaoBoiDuong) => {
        console.log(response);
        this.getListQuaTrinhDaoTaoBoiDuong(this.loadHoSo);

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

    this.theService.deleteQuaTrinhDaoTaoBoiDuong(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListQuaTrinhDaoTaoBoiDuong(this.loadHoSo);

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Xóa thành công!", "danger");
        this.p = Math.ceil((this.listQuaTrinhDaoTaoBoiDuong.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  // public refresh(): void {
  //   this.getListQuaTrinhDaoTaoBoiDuong();
  //
  // }


  public onOpenModalAdd(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenEditOrDeleteModal(obj: QuaTrinhDaoTaoBoiDuong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editQuaTrinhDaoTaoBoiDuong = obj;

      this.keyId = obj.id;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteQuaTrinhDaoTaoBoiDuong = obj;

      this.keyId = obj.id;
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
    }, 1500);
  }

  tenChucVuGeted: string = '';
  getTenChucVu(chucVuID: string) : void {
    this.chucVuService.getChucVu(chucVuID).subscribe({
      next: value => {
        this.tenChucVuGeted = value.tenChucDanh;
      },
      error: err => {}
    });
  }
}
