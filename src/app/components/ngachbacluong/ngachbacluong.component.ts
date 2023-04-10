import { Component } from '@angular/core';
import {NgachBacLuong} from "../../models/ngachbacluong";
import {NgachbacluongService} from "../../services/ngachbacluong.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ngachbacluong',
  templateUrl: './ngachbacluong.component.html',
  styleUrls: ['./ngachbacluong.component.css']
})
export class NgachbacluongComponent {
  public listNgachBacLuong: NgachBacLuong[] = [];
  public editNgachBacLuong: NgachBacLuong = new NgachBacLuong();
  public deleteNgachBacLuong: NgachBacLuong | undefined;
  public keyId: string = '';

  protected ten: string = '';
  p:  number = 1;

  constructor(private theService: NgachbacluongService,  private router: Router) {
  }

  ngOnInit(): void {
    this.getListNgachBacLuong();
  }

  public getListNgachBacLuong(): void {
    this.theService.listNgachBacLuong().subscribe(
      (res: NgachBacLuong[]) => {
        this.listNgachBacLuong = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addNgachBacLuong(addForm.value).subscribe(
      (response: NgachBacLuong) => {
        console.log(response);
        this.getListNgachBacLuong();
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Thâm thành công!", "success");
      //  this.p = Math.ceil((this.listNgachBacLuong.length + 1) / 5);
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

  public onUpdate(obj: NgachBacLuong): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateNgachBacLuong(this.keyId, obj).subscribe(
      (response: NgachBacLuong) => {
        console.log(response);
        this.getListNgachBacLuong();

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
    this.theService.deleteNgachBacLuong(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListNgachBacLuong();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Xóa thành công!", "danger");
     //   this.p = Math.ceil((this.listNgachBacLuong.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchName(): void {
  //   this.theService.searchNgachBacLuongByName(this.ten).subscribe(
  //     (res: NgachBacLuong[]) => {
  //       this.listNgachBacLuong = res;
  //
  //     },
  //     (err: HttpErrorResponse) => {
  //       alert(err.message);
  //     }
  //   );
  // }
  nhomNgachSelected: string = 'A0';

  public refresh(): void {
    this.getListNgachBacLuong();
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

  public onOpenEditOrDeleteModal(obj: NgachBacLuong, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editNgachBacLuong = obj;
      this.keyId = obj.maNgach;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteNgachBacLuong = obj;
      this.keyId = obj.maNgach;
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

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r));
  }
}
