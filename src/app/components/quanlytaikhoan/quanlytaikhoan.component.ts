import { Component } from '@angular/core';

import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Taikhoan} from "../../models/taikhoan";
import {TaikhoanService} from "../../services/taikhoan.service";

@Component({
  selector: 'app-quanlytaikhoan',
  templateUrl: './quanlytaikhoan.component.html',
  styleUrls: ['./quanlytaikhoan.component.css']
})
export class QuanlytaikhoanComponent {
  public listTaikhoan: Taikhoan[] = [];
  public editTaikhoan: Taikhoan = new Taikhoan();
  public deleteTaikhoan: Taikhoan | undefined;
  public keyId: number = 0;

  protected ten: string = '';

  constructor(private theService: TaikhoanService) {
  }

  ngOnInit(): void {
    this.getListTaikhoan();
  }

  public getListTaikhoan(): void {
    this.theService.listTaiKhoan().subscribe(
      (res: Taikhoan[]) => {
        this.listTaikhoan = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addTaikhoan(addForm.value).subscribe(
      (response: Taikhoan) => {
        console.log(response);
        this.getListTaikhoan();
        addForm.reset();
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Thêm thành công!", "success");
      },
      (error: HttpErrorResponse) => {
        if (error.status == 406) {

          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Thêm thất bại. Tên đăng nhập đã tồn tại!", "warning");
        }
        addForm.reset();
      }
    );
  }

  public onUpdate(obj: Taikhoan): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateQuyenAndTrangThaiTaiKhoan(this.keyId, obj).subscribe(
      (response: Taikhoan) => {
        console.log(response);
        this.getListTaikhoan();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Đã cập nhật!", "info");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDelete(keyId: number): void {
    // @ts-ignore
    document.getElementById('delete-form-btn-no').click();
    this.theService.deleteTK(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListTaikhoan();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Xoá thành công!", "danger");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchName(): void {
    this.theService.listTaiKhoanByUserName(this.ten).subscribe(
      (res: Taikhoan[]) => {
        this.listTaikhoan = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public refresh(): void {
    this.getListTaikhoan();
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
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenEditOrDeleteModal(obj: Taikhoan, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editTaikhoan = obj;
      this.keyId = obj.id;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteTaikhoan = obj;
      this.keyId = obj.id;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }


  public displayQuyen(q : number) : string {
    if(q == 1) {
      return 'Quản trị viên'
    }
    else if(q == 2) {
      return 'Cán bộ tổ chức'
    }
    else {
      return 'Người dùng'
    }
  }

  public displayTrangThai(q : number) : string {
    if(q == 0) {
      return 'Vô hiệu hoá'
    }
    else {
      return 'Bình thường'
    }
  }

  public checkAlreadyUseAccount(tk : Taikhoan) : boolean {
    // @ts-ignore
    return tk.tenDangNhap === localStorage.getItem('token').toString();
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
}
