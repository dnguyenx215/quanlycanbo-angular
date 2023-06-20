import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Hệ thống quản lý cán bộ';
  header = document.getElementById('the-header');
  constructor(private authService: AuthService, private router : Router) {
  }

  ngOnInit() {

  }

  public signOut(): void {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(["/login"]);
  }

  public setAccountName(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  public hiddenHeaderAndFooter(): boolean {
    const container = document.getElementById('main-container');
    const token = window.localStorage.getItem('token');
    if(token === null) {
      container!.style.backgroundImage = "url('https://wallpapercave.com/wp/wp8478134.jpg')";
    }
    else {
      container!.style.backgroundColor = "rgba(255,251,208,0.15)";
    }
    return !token;

  }

  checkQuyenTK(): number {
    // @ts-ignore
    return parseInt(localStorage.getItem("pquyen"), 10);
  }

  navigate(url : string) {
    this.router.navigate([url]).then(r => console.log(r));
  }
}
