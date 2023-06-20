import {Component} from '@angular/core';
import {NgachBacLuong} from "../../models/ngachbacluong";
import {NgachbacluongService} from "../../services/ngachbacluong.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hesongachbacluong',
  templateUrl: './hesongachbacluong.component.html',
  styleUrls: ['./hesongachbacluong.component.css']
})
export class HesongachbacluongComponent {
  public listNgachBacLuong: NgachBacLuong[] = [];
  public listLoai: String[] = [];
  public listNhom: String[] = [];
  public editNgachBacLuong: NgachBacLuong | undefined;
  public deleteNgachBacLuong: NgachBacLuong | undefined;
  public keyId: string = '';
  public loai: string = '';
  public slNhom = document.getElementById('lb-sl-nhom');
  nhomNgachSelected: any = '';

  constructor(private theService: NgachbacluongService, private router : Router) {
  }

  ngOnInit(): void {
    this.getListNhomNgach();
    this.getListLoai();

  }

  public selectNhom(selectForm: NgForm): void {
    // @ts-ignore
    this.slNhom = selectForm.form.get('c-nhom')?.value;
    console.log(this.slNhom);
    this.getListNgachBacLuong();
  }

  public getListNgachBacLuong(): void {
    // @ts-ignore
    this.theService.listHeSoNgachBacLuong(this.slNhom).subscribe(
      (res: NgachBacLuong[]) => {
        this.listNgachBacLuong = res;

      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }

  public getListLoai(): void {
    this.theService.findAllLoai().subscribe(
      (res: String[]) => {
        this.listLoai = res;
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }

  public getListNhomNgach(): void {
    this.theService.findAllNhom().subscribe(
      (res: String[]) => {
        this.listNhom = res;
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        alert(err.statusText);
      }
    );
  }

  public onAdd(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-obj-form').click();
    // @ts-ignore
    let heSo: number[] = [];
    heSo.push(addForm.form.get('bac1')?.value);
    heSo.push(addForm.form.get('bac2')?.value);
    heSo.push(addForm.form.get('bac3')?.value);
    heSo.push(addForm.form.get('bac4')?.value);
    heSo.push(addForm.form.get('bac5')?.value);
    heSo.push(addForm.form.get('bac6')?.value);
    heSo.push(addForm.form.get('bac7')?.value);
    heSo.push(addForm.form.get('bac8')?.value);
    heSo.push(addForm.form.get('bac9')?.value);
    heSo.push(addForm.form.get('bac10')?.value);
    heSo.push(addForm.form.get('bac11')?.value);
    heSo.push(addForm.form.get('bac12')?.value);
    // @ts-ignore
    this.loai = addForm.form.get('ds-loai')?.value;
    console.log(heSo);
    this.theService.addSoNgachBacLuong(this.loai, heSo).subscribe(
      (response: NgachBacLuong) => {
        console.log(response);

        this.getListNgachBacLuong();
        addForm.reset();

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Sucessfully added!", "success");
      },
      (error: HttpErrorResponse) => {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        console.error(error);
        // @ts-ignore
        // this.alertHold(alertPlaceholder, "Thêm thất bại. Mã đã tồn tại!", "warning");

        addForm.reset();
      }
    );
  }

  public onUpdate(form: NgForm): void {
    const obj = form.value;
    let hs : number[] = [];
    hs.push(obj.bac1);
    hs.push(obj.bac2);
    hs.push(obj.bac3);
    hs.push(obj.bac4);
    hs.push(obj.bac5);
    hs.push(obj.bac6);
    hs.push(obj.bac7);
    hs.push(obj.bac8);
    hs.push(obj.bac9);
    hs.push(obj.bac10);
    hs.push(obj.bac11);
    hs.push(obj.bac12);

    // @ts-ignore
    document.getElementById('edit-obj-btn-close').click();
    this.theService.addSoNgachBacLuong(obj.loai, hs).subscribe(
      (response: NgachBacLuong) => {
        console.log(response);
        this.getListNgachBacLuong();
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        // @ts-ignore
        this.alertHold(alertPlaceholder, "Update successfully!", "info");
        hs = [0,0,0,0,0,0,0,0,0,0,0,0];
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
        this.alertHold(alertPlaceholder, "Delete successfully!", "danger");
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public refresh(): void {
    this.getListNgachBacLuong();
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
    this.router.navigate([url]).then(r => console.log(r))
  }
}
