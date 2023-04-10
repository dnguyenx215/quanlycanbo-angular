import {HoSo} from "../models/hoso";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DanToc} from "../models/dantoc";
import {TonGiao} from "../models/tongiao";

@Injectable({
  providedIn: "root"
})
export class HoSoService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listHoSo(): Observable<HoSo[]> {
    return this.http.get<HoSo[]>(`${this.apiServerUrl}/hoso/list`);
  }

  public listHoSoByName(hoTen : string): Observable<HoSo[]> {
    return this.http.get<HoSo[]>(`${this.apiServerUrl}/hoso/list?hoten=${hoTen}`);
  }

  public listHoSoByDonVi(madv : string): Observable<HoSo[]> {
    return this.http.get<HoSo[]>(`${this.apiServerUrl}/hoso/list?madv=${madv}`);
  }

  public listHoSoByPhongBan(mapb : number): Observable<HoSo[]> {
    return this.http.get<HoSo[]>(`${this.apiServerUrl}/hoso/list?mapb=${mapb}`);
  }

  public getHoSo(id : number): Observable<HoSo> {
    return this.http.get<HoSo>(`${this.apiServerUrl}/hoso/get?id=${id}`);
  }

  public addHoSo(obj: HoSo): Observable<HoSo> {
    return this.http.post<HoSo>(`${this.apiServerUrl}/hoso/add`, obj);
  }

  public updateHoSo(objId: number, obj: HoSo): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/update?id=${objId}`, obj);
  }

  public updateHoSoMucLuong(b: number, h: number, m: number): Observable<number> {
    return this.http.put<number>(`${this.apiServerUrl}/hoso/updateheso?bac=${b}&heso=${h}&macb=${m}`, null);
  }
  public updateHoSoDanhGia(d: string, dg: string, m: number): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/danhgia?ngaydg=${d}&id=${m}`, dg);
  }

  public updateHoSoDaoTaoBoiDuong(id: number, ngayGuiDTBD: string, tenCNDTBD: string, trangThaiDTBD: string): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/daotaoboiduong?id=${id}&ngayguidtbd=${ngayGuiDTBD}&tencn=${tenCNDTBD}`, trangThaiDTBD);
  }


  public updateHoSoKhenThuong(s: string, d: string, dg: string, m: number): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/khenthuong?soqd=${s}&ngayqd=${d}&id=${m}`, dg);
  }
  public updateHoSoKyLuat(s: string, d: string, dg: string, m: number): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/kyluat?soqd=${s}&ngayqd=${d}&id=${m}`, dg);
  }

  public deleteHoSo(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/hoso/delete?id=${objId}`);
  }
  public getDanToc(id : number): Observable<DanToc> {
    return this.http.get<DanToc>(`${this.apiServerUrl}/dantoc/get/${id}`);
  }
  public listDanToc(): Observable<DanToc[]> {
    return this.http.get<DanToc[]>(`${this.apiServerUrl}/dantoc/list`);
  }
  public listTonGiao(): Observable<TonGiao[]> {
    return this.http.get<TonGiao[]>(`${this.apiServerUrl}/tongiao/list`);
  }

  public uploadImage(fileData: any): Observable<HoSo> {
    return this.http.put<HoSo>(`${this.apiServerUrl}/hoso/upload-image?file`, fileData);
  }

  public getFileData(idFile: any) {
    return this.http.get(`${this.apiServerUrl}/hoso/open/${idFile}`, {observe: "response", responseType: "blob"});
  }
}

