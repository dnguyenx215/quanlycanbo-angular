import { Component } from '@angular/core';
import {ChucVu} from "../../models/chucvu";
import {ChucVuService} from "../../services/chucvu.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  styleUrls: ['./chucvu.component.css']
})
export class ChucvuComponent {
  public listChucVu: ChucVu[] = [];
  public editChucVu: ChucVu = new ChucVu();
  public deleteChucVu: ChucVu  = new ChucVu();
  public keyId: string = '';

  protected ten: string = '';
  p:  number = 1;

  constructor(private theService: ChucVuService) {
  }

  ngOnInit(): void {
    this.getListChucVu();
  }

  public getListChucVu(): void {
    this.theService.listChucVu().subscribe(
      (res: ChucVu[]) => {
        this.listChucVu = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addChucVu(addForm.value).subscribe(
      (response: ChucVu) => {
        console.log(response);
        this.getListChucVu();
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Thêm thành công!", "success");
        this.p = Math.ceil((this.listChucVu.length + 1) / 5);
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

  public onUpdate(obj: ChucVu): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateChucVu(this.keyId, obj).subscribe(
      (response: ChucVu) => {
        console.log(response);
        this.getListChucVu();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Update successfully!", "info");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDelete(keyId: string): void {
    // @ts-ignore
    document.getElementById('delete-form-btn-no').click();
    this.theService.deleteChucVu(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListChucVu();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Xóa thành công!", "danger");
        this.p = Math.ceil((this.listChucVu.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  maChucDanh: string = '';
  nhomChucDanhSelected: string = '';

  public setMaChucDanh(): void {
    this.maChucDanh = Math.floor(100 + Math.random() * 100).toString();
    for (const item of this.listChucVu) {
      if(item.maChucDanh === this.maChucDanh) {
        this.maChucDanh = Math.floor(100 + Math.random() * 100).toString();
      }
      else {
        break;
      }
    }
  }

  public refresh(): void {
    this.getListChucVu();
    this.ten = '';
  }


  public onOpenModalAdd(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    this.setMaChucDanh();
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

  public onOpenEditOrDeleteModal(obj: ChucVu, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editChucVu = obj;
      // @ts-ignore
      this.keyId = obj.maChucDanh;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteChucVu = obj;
      // @ts-ignore
      this.keyId = obj.maChucDanh;
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
}
