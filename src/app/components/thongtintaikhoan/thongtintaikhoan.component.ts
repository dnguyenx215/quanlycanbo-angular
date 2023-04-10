import {Component} from '@angular/core';
import {TaikhoanService} from "../../services/taikhoan.service";
import {Taikhoan} from "../../models/taikhoan";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-thongtintaikhoan',
  templateUrl: './thongtintaikhoan.component.html',
  styleUrls: ['./thongtintaikhoan.component.css']
})
export class ThongtintaikhoanComponent {
  userName = localStorage.getItem('token');
  tkInfo : Taikhoan = new Taikhoan();

  ngOnInit() {
    // @ts-ignore
    this.loadTkInformation(this.userName);
  }


  constructor(private tkService: TaikhoanService, private router: Router) {
  }

  navigate(url: string) {
    this.router.navigate([url]).then(r => console.log(r))
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


  onUpdate(obj: Taikhoan) {
    this.tkService.updateTaiKhoan(this.tkInfo.id, obj).subscribe({
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

}
