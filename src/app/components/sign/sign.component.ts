import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Taikhoan} from "../../models/taikhoan";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent {
  loginForm: FormGroup = new FormGroup({});
  message: string = '';
  returnUrl: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }

// convenience getter for easy access to form fields
//   get f() { return this.loginForm.controls; }
  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return alert('Please enter username and password!');
    } else {
      let u = this.loginForm.controls['username'].value;
      let p = this.loginForm.controls['password'].value;
      this.authService.getTaiKhoan(u, p).subscribe(
        (res: Taikhoan) => {
          if(res !== null) {
            if (res.kichHoat == 1) {
              localStorage.setItem('isLoggedIn', "true");
              localStorage.setItem('token', this.loginForm.controls['username'].value);
              localStorage.setItem('pquyen', String(res.quyen));
              console.log("Login successful")
              this.router.navigate([this.returnUrl]).then(r => console.log(r.valueOf()));

            } else if (res.kichHoat == 0) {
              this.message = "Tài khoản đã bị vô hiệu hoá. Vui lòng liên hệ quản trị viên!";
              console.log(this.message);
              alert(this.message);
            }
          }
          else {
            this.message = "Tên đăng nhập hoặc mật khẩu không đúng!";
            console.log(this.message);
            alert(this.message);
          }

        },
        (err: HttpErrorResponse) => {
          alert(err.statusText);
        }
      );
    }
  }
}
