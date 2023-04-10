import {Injectable} from "@angular/core";
import {DonVi} from "../models/donvi";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DonViService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listDonVi(): Observable<DonVi[]> {
    return this.http.get<DonVi[]>(`${this.apiServerUrl}/donvi/list`);
  }
  public getDonVi(id : string): Observable<DonVi> {
    return this.http.get<DonVi>(`${this.apiServerUrl}/donvi?id=${id}`);
  }
  public getDonViByName(ten : string): Observable<DonVi> {
    return this.http.get<DonVi>(`${this.apiServerUrl}/donvi/${ten}`);
  }

  public addDonVi(obj: DonVi): Observable<DonVi> {
    return this.http.post<DonVi>(`${this.apiServerUrl}/donvi/add`, obj);
  }

  public updateDonVi(objId: string | undefined, obj: DonVi): Observable<DonVi> {
    return this.http.put<DonVi>(`${this.apiServerUrl}/donvi/${objId}`, obj);
  }

  public deleteDonVi(objId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/donvi/${objId}`);
  }

  public searchDonViByName(ten: String): Observable<DonVi[]> {
    return this.http.get<DonVi[]>(`${this.apiServerUrl}/donvi/list?ten=${ten}`);
  }

}

