import { Component } from '@angular/core';
import {Taikhoan} from "../../../models/taikhoan";
import {TaikhoanService} from "../../../services/taikhoan.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-doimatkhau',
  templateUrl: './doimatkhau.component.html',
  styleUrls: ['./doimatkhau.component.css']
})
export class DoimatkhauComponent {
  userName = localStorage.getItem('token');
  tkInfo : Taikhoan = new Taikhoan();
  newPassWd: string = '';
  confirmPassWd: string = '';
  ngOnInit() {
    // @ts-ignore
    this.loadTkInformation(this.userName);
  }


  constructor(private tkService: TaikhoanService) {
  }

  public loadTkInformation(userName: string): void {
    this.tkService.getTaiKhoanByUserName(userName).subscribe({
      next: (data: Taikhoan) => {
        this.tkInfo = data;
      },
      error: (error: any) => {
      }
    });

  }


  onUpdate(tk: Taikhoan) {
    this.tkService.updateMatKhauTaiKhoan(this.tkInfo.id, tk.matKhau).subscribe({
        next: (res) => {
          console.log(res);
          const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
          // @ts-ignore
          this.alertHold(alertPlaceholder, "Cập nhật thành công!", "info");
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
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
    }, 1000);
  }

  invalidNewPasswd(newPass : string, confirmPass : string) : boolean{
    if(newPass === '' || confirmPass === ''){
      return true;
    }
    return newPass !== confirmPass;
  }
}
