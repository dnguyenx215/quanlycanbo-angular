import {Injectable} from "@angular/core";
import {QuaTrinhDaoTaoBoiDuong} from "../models/quatrinhdaotaoboiduong";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DonVi} from "../models/donvi";
import {HoSo} from "../models/hoso";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
@Injectable({
  providedIn: "root"
})
export class QuaTrinhDaoTaoBoiDuongService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listQuaTrinhDaoTaoBoiDuong(): Observable<QuaTrinhDaoTaoBoiDuong[]> {
    return this.http.get<QuaTrinhDaoTaoBoiDuong[]>(`${this.apiServerUrl}/quatrinhdtbd/list`);
  }
  public listQuaTrinhDaoTaoBoiDuongByHoSo(idhoso : number): Observable<QuaTrinhDaoTaoBoiDuong[]> {
    return this.http.get<QuaTrinhDaoTaoBoiDuong[]>(`${this.apiServerUrl}/quatrinhdtbd/listbyhoso/${idhoso}`);
  }

  public getQuaTrinhDaoTaoBoiDuong(id : number): Observable<QuaTrinhDaoTaoBoiDuong> {
    return this.http.get<QuaTrinhDaoTaoBoiDuong>(`${this.apiServerUrl}/quatrinhdtbd/get/${id}`);
  }

  public addQuaTrinhDaoTaoBoiDuong(obj: ɵTypedOrUntyped<{
    coSoDaoTaoBoiDuong: FormControl<any>;
    trinhDoDaoTaoBoiDuong: FormControl<any>;
    hoSo: FormControl<HoSo | null>;
    tuNgay: FormControl<any>;
    denNgay: FormControl<any>;
    tenChuyenNganhDaoTaoBoiDuong: FormControl<any>;
    trangThaiDaoTaoBoiDuong: FormControl<any>
  }, ɵFormGroupValue<{
    coSoDaoTaoBoiDuong: FormControl<any>;
    trinhDoDaoTaoBoiDuong: FormControl<any>;
    hoSo: FormControl<HoSo | null>;
    tuNgay: FormControl<any>;
    denNgay: FormControl<any>;
    tenChuyenNganhDaoTaoBoiDuong: FormControl<any>;
    trangThaiDaoTaoBoiDuong: FormControl<any>
  }>, any>): Observable<QuaTrinhDaoTaoBoiDuong> {
    return this.http.post<QuaTrinhDaoTaoBoiDuong>(`${this.apiServerUrl}/quatrinhdtbd/add`, obj);
  }

  public updateQuaTrinhDaoTaoBoiDuong(objId: number, obj: QuaTrinhDaoTaoBoiDuong): Observable<QuaTrinhDaoTaoBoiDuong> {
    return this.http.put<QuaTrinhDaoTaoBoiDuong>(`${this.apiServerUrl}/quatrinhdtbd/${objId}`, obj);
  }

  public deleteQuaTrinhDaoTaoBoiDuong(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/quatrinhdtbd/${objId}`);
  }
}

