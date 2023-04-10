import {Injectable} from "@angular/core";
import {NgachBacLuong} from "../models/ngachbacluong";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: "root"
})
export class NgachbacluongService {
  private apiServerUrl = "http://localhost:8009/api";

  constructor(private http: HttpClient) {}


  public listNgachBacLuong(): Observable<NgachBacLuong[]> {
    return this.http.get<NgachBacLuong[]>(`${this.apiServerUrl}/ngach/list`);
  }

  public getNgachBacLuongByID(id : string): Observable<NgachBacLuong> {
    return this.http.get<NgachBacLuong>(`${this.apiServerUrl}/ngach/${id}`);
  }

  public addNgachBacLuong(obj: NgachBacLuong): Observable<NgachBacLuong> {
    return this.http.post<NgachBacLuong>(`${this.apiServerUrl}/ngach/add`, obj);
  }

  public updateNgachBacLuong(objId: string | undefined, obj: NgachBacLuong): Observable<NgachBacLuong> {
    return this.http.put<NgachBacLuong>(`${this.apiServerUrl}/ngach?id=${objId}`, obj);
  }

  public deleteNgachBacLuong(objId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ngach?id=${objId}`);
  }

  public listHeSoNgachBacLuong(s : String): Observable<NgachBacLuong[]> {
    return this.http.get<NgachBacLuong[]>(`${this.apiServerUrl}/hesongach/list?nhom=${s}`);
  }
  public addSoNgachBacLuong(loai : String, heSo : number[]): Observable<NgachBacLuong> {
    return this.http.post<NgachBacLuong>(`${this.apiServerUrl}/hesongach/add?loai=${loai}`, heSo);
  }
  public findAllLoai(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/hesongach/loai`);
  }
  public findAllNhom(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/hesongach/nhom`);
  }

  public getHeSoByBac(b : string, m : string): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/heso?bac=${b}&mangach=${m}`);
  }
}

