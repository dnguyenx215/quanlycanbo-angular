import {Component} from '@angular/core';
import {DonVi} from "../../models/donvi";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DonViService} from "../../services/donvi.service";

@Component({
  selector: 'app-donvi',
  templateUrl: './donvi.component.html',
  styleUrls: ['./donvi.component.css']
})
export class DonviComponent {
  public listDonVi: DonVi[] = [];
  public editDonVi: DonVi  = new DonVi();
  public deleteDonVi: DonVi | undefined;
  public keyId: string = '';

  p: number = 1;
  protected ten: string = '';
  MDVSelected: string = 'BNV';

  constructor(private theService: DonViService) {
  }

  ngOnInit(): void {
    this.getListDonVi();
  }

  public getListDonVi(): void {
    this.theService.listDonVi().subscribe(
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

    this.theService.addDonVi(addForm.value).subscribe(
      (response: DonVi) => {
        console.log(response);
        this.getListDonVi();
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        if (response != null) {
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Sucessfully added!", "success");
        } else {
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Add Failed!", "warning");
        }
        this.p = Math.ceil((this.listDonVi.length + 1) / 5);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 204) {
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Thêm thất bại. Mã đã tồn tại!", "warning");
        }
        addForm.reset();
      }
    );
  }

  public onUpdate(obj: DonVi): void {
    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.updateDonVi(this.keyId, obj).subscribe(
      (response: DonVi) => {
        console.log(response);
        this.getListDonVi();

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
    this.theService.deleteDonVi(keyId).subscribe(
      (response: void) => {
        console.log(response);
        this.getListDonVi();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Delete successfully!", "danger");
        this.p = Math.ceil((this.listDonVi.length - 1) / 5);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchName(): void {
    this.theService.searchDonViByName(this.ten).subscribe(
      (res: DonVi[]) => {
        this.listDonVi = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  }

  public refresh(): void {
    this.getListDonVi();
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
      this.setMaDV(this.MDVSelected);
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onOpenEditOrDeleteModal(obj: DonVi, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.editDonVi = obj;
      this.keyId = obj.maDonVi;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteDonVi = obj;
      this.keyId = obj.maDonVi;
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

  public madv = '';
  setMaDV(mdv : string) : void {
    this.madv = mdv + Math.floor(Math.random() * 100);
    for (const itemdv of this.listDonVi) {
      if(itemdv.maDonVi === this.madv) {
        this.madv = mdv + Math.floor(Math.random() * 100);
      }
      else {
        break;
      }
    }
  }

  isTTTT(maDonVi: string) : boolean{
    if(maDonVi === 'BNV54') {
      return true;
    }
    return false;
  }
}
