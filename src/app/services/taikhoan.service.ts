import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Taikhoan} from "../models/taikhoan";
import {DonVi} from "../models/donvi";

@Injectable({
  providedIn: 'root'
})
export class TaikhoanService {
  private apiServerUrl = "http://localhost:8009/api";

  constructor(private http: HttpClient) {
  }

  public listTaiKhoan(): Observable<Taikhoan[]> {
    return this.http.get<Taikhoan[]>(`${this.apiServerUrl}/taikhoan/list`);
  }
  public getTaiKhoanByUserName(u: String): Observable<Taikhoan> {
    return this.http.get<Taikhoan>(`${this.apiServerUrl}/taikhoan?u=${u}`);
  }

  public listTaiKhoanByUserName(u: String): Observable<Taikhoan[]> {
    return this.http.get<Taikhoan[]>(`${this.apiServerUrl}/taikhoan/listbyusername?u=${u}`);
  }
  public updateTaiKhoan(id: number, tk: Taikhoan): Observable<Taikhoan> {
    return this.http.put<Taikhoan>(`${this.apiServerUrl}/taikhoan/update?id=${id}`, tk);
  }

  public updateQuyenAndTrangThaiTaiKhoan(id: number, tk: Taikhoan): Observable<Taikhoan> {
    return this.http.put<Taikhoan>(`${this.apiServerUrl}/taikhoan/update/quyen?id=${id}`, tk);
  }

  public updateMatKhauTaiKhoan(id: number, p: string): Observable<Taikhoan> {
    return this.http.put<Taikhoan>(`${this.apiServerUrl}/taikhoan/update/mk?id=${id}&mk=${p}`, null);
  }


  public addTaikhoan(obj: Taikhoan): Observable<Taikhoan> {
    return this.http.post<Taikhoan>(`${this.apiServerUrl}/taikhoan/add`, obj);
  }

  public deleteTK(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/taikhoan/${objId}`);
  }


}
