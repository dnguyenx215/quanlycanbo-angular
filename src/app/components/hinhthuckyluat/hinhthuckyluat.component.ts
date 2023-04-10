import { Component } from '@angular/core';
import {HinhThucKyLuat} from "../../models/hinhthuckyluat";
import {HinhThucKyLuatService} from "../../services/hinhthuckyluat.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-hinhthuckyluat',
  templateUrl: './hinhthuckyluat.component.html',
  styleUrls: ['./hinhthuckyluat.component.css']
})
export class HinhThucKyLuatComponent {
  public listHinhThucKyLuat: HinhThucKyLuat[] = [];
  public editHinhThucKyLuat: HinhThucKyLuat = new HinhThucKyLuat();
  public deleteHinhThucKyLuat: HinhThucKyLuat = new HinhThucKyLuat();
  public keyId: number = 0;

  protected ten: string = '';
  p: number = 1;

  constructor(private theService: HinhThucKyLuatService) {
  }

  ngOnInit(): void {
    this.getListHinhThucKyLuat();
  }

  public getListHinhThucKyLuat(): void {
    this.theService.listHinhThucKyLuat().subscribe(
      (res: HinhThucKyLuat[]) => {
        this.listHinhThucKyLuat = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }

  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addHinhThucKyLuat(addForm.value).subscribe(
      (response: HinhThucKyLuat) => {
        console.log(response);
        this.getListHinhThucKyLuat();
        console.log(this.listHinhThucKyLuat.length);
        this.p = Math.ceil((this.listHinhThucKyLuat.length + 1) / 5);
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

  public onUpdate(obj: HinhThucKyLuat): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateHinhThucKyLuat(this.keyId, obj).subscribe(
      (response: HinhThucKyLuat) => {
        console.log(response);
        this.getListHinhThucKyLuat();

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
    this.theService.deleteHinhThucKyLuat(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListHinhThucKyLuat();
        this.p = Math.ceil((this.listHinhThucKyLuat.length - 1) / 5);
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
  //   this.theService.searchHinhThucKyLuatByName(this.ten).subscribe(
  //     (res: HinhThucKyLuat[]) => {
  //       this.listHinhThucKyLuat = res;
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
    this.getListHinhThucKyLuat();
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

  public onOpenEditOrDeleteModal(obj: HinhThucKyLuat, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editHinhThucKyLuat = obj;
      this.keyId = obj.idHT;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteHinhThucKyLuat = obj;
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
