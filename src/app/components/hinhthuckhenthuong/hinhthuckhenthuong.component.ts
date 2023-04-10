import { Component } from '@angular/core';
import {HinhThucKhenThuong} from "../../models/hinhthuckhenthuong";
import {HinhThucKhenThuongService} from "../../services/hinhthuckhenthuong.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hinhthuckhenthuong',
  templateUrl: './hinhthuckhenthuong.component.html',
  styleUrls: ['./hinhthuckhenthuong.component.css']
})
export class HinhthuckhenthuongComponent {
  public listHinhThucKhenThuong: HinhThucKhenThuong[] = [];
  public editHinhThucKhenThuong: HinhThucKhenThuong = new HinhThucKhenThuong();
  public deleteHinhThucKhenThuong: HinhThucKhenThuong = new HinhThucKhenThuong();
  public keyId: number = 0;

  protected ten: string = '';
  p: number = 1;

  constructor(private theService: HinhThucKhenThuongService) {
  }

  ngOnInit(): void {
    this.getListHinhThucKhenThuong();
  }

  public getListHinhThucKhenThuong(): void {
    this.theService.listHinhThucKhenThuong().subscribe(
      (res: HinhThucKhenThuong[]) => {
        this.listHinhThucKhenThuong = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }

  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addHinhThucKhenThuong(addForm.value).subscribe(
      (response: HinhThucKhenThuong) => {
        console.log(response);
        this.getListHinhThucKhenThuong();
        console.log(this.listHinhThucKhenThuong.length);
        this.p = Math.ceil((this.listHinhThucKhenThuong.length + 1) / 5);
        addForm.reset();

        console.log(this.p)
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Sucessfully added!", "success");

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

  public onUpdate(obj: HinhThucKhenThuong): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateHinhThucKhenThuong(this.keyId, obj).subscribe(
      (response: HinhThucKhenThuong) => {
        console.log(response);
        this.getListHinhThucKhenThuong();

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
    this.theService.deleteHinhThucKhenThuong(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListHinhThucKhenThuong();
        this.p = Math.ceil((this.listHinhThucKhenThuong.length - 1) / 5);
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Delete successfully!", "danger");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  // public searchName(): void {
  //   this.theService.searchHinhThucKhenThuongByName(this.ten).subscribe(
  //     (res: HinhThucKhenThuong[]) => {
  //       this.listHinhThucKhenThuong = res;
  //
  //     },
  //     (err: HttpErrorResponse) => {
  //       alert(err.message);
  //     }
  //   );
  // }
  pageChange: any;
  pageBoundsCorrection: any;

  public refresh(): void {
    this.getListHinhThucKhenThuong();
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

  public onOpenEditOrDeleteModal(obj: HinhThucKhenThuong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editHinhThucKhenThuong = obj;
      this.keyId = obj.idHT;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteHinhThucKhenThuong = obj;
      this.keyId = obj.idHT;
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
