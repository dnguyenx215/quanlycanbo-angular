import {Injectable} from "@angular/core";
import {PhongBan} from "../models/phongban";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DonVi} from "../models/donvi";
@Injectable({
  providedIn: "root"
})
export class PhongBanService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listPhongBan(): Observable<PhongBan[]> {
    return this.http.get<PhongBan[]>(`${this.apiServerUrl}/phongban/list`);
  }
  public listPhongBanByDonVi(dv : DonVi): Observable<PhongBan[]> {
    return this.http.post<PhongBan[]>(`${this.apiServerUrl}/phongban/listbydonvi`, dv);
  }

  public getPhongBan(id : number): Observable<PhongBan> {
    return this.http.get<PhongBan>(`${this.apiServerUrl}/phongban/get/${id}`);
  }
  public getPhongBanByName(ten : string): Observable<PhongBan> {
    return this.http.get<PhongBan>(`${this.apiServerUrl}/phongban/${ten}`);
  }

  public addPhongBan(obj: PhongBan): Observable<PhongBan> {
    return this.http.post<PhongBan>(`${this.apiServerUrl}/phongban/add`, obj);
  }

  public updatePhongBan(objId: number | undefined, obj: PhongBan): Observable<PhongBan> {
    return this.http.put<PhongBan>(`${this.apiServerUrl}/phongban/${objId}`, obj);
  }

  public deletePhongBan(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/phongban/${objId}`);
  }

  public searchPhongBanByName(ten: String): Observable<PhongBan[]> {
    return this.http.get<PhongBan[]>(`${this.apiServerUrl}/phongban/ten/${ten}`);
  }
}

