import { Component } from '@angular/core';
import {TonGiao} from "../../../models/tongiao";
import {TonGiaoService} from "../../../services/tongiao.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-tongiao',
  templateUrl: './tongiao.component.html',
  styleUrls: ['./tongiao.component.css']
})
export class TongiaoComponent {
  public listTonGiao: TonGiao[] = [];
  public editTonGiao: TonGiao = new TonGiao();
  public deleteTonGiao: TonGiao = new TonGiao();
  public keyId: number = 0;
  p:  number = 1;
  protected ten: string = '';

  constructor(private theService: TonGiaoService) {
  }

  ngOnInit(): void {
    this.getListTonGiao();
  }

  public getListTonGiao(): void {
    this.theService.listTonGiao().subscribe(
      (res: TonGiao[]) => {
        this.listTonGiao = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }


  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();

    this.theService.addTonGiao(addForm.value).subscribe(
      (response: TonGiao) => {
        console.log(response);
        this.getListTonGiao();
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Sucessfully added!", "success");
        this.p = Math.ceil((this.listTonGiao.length + 1) / 5);
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

  public onUpdate(obj: TonGiao): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateTonGiao(this.keyId, obj).subscribe(
      (response: TonGiao) => {
        console.log(response);
        this.getListTonGiao();

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
    this.theService.deleteTonGiao(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListTonGiao();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Delete successfully!", "danger");
        this.p = Math.ceil((this.listTonGiao.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // public searchName(): void {
  //   this.theService.searchTonGiaoByName(this.ten).subscribe(
  //     (res: TonGiao[]) => {
  //       this.listTonGiao = res;
  //
  //     },
  //     (err: HttpErrorResponse) => {
  //       alert(err.message);
  //     }
  //   );
  // }


  public refresh(): void {
    this.getListTonGiao();
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

  public onOpenEditOrDeleteModal(obj: TonGiao, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editTonGiao = obj;

      this.keyId = obj.maTonGiao;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteTonGiao = obj;

      this.keyId = obj.maTonGiao;
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
