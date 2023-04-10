import {Injectable} from "@angular/core";
import {HinhThucKyLuat} from "../models/hinhthuckyluat";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HinhThucKyLuatService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listHinhThucKyLuat(): Observable<HinhThucKyLuat[]> {
    return this.http.get<HinhThucKyLuat[]>(`${this.apiServerUrl}/htkl/list`);
  }

  public listHinhThucKyLuatByDonVi(dv : string): Observable<HinhThucKyLuat[]> {
    return this.http.get<HinhThucKyLuat[]>(`${this.apiServerUrl}/htkl/list?donvi=${dv}`);
  }

  public getHinhThucKyLuat(id : string): Observable<HinhThucKyLuat> {
    return this.http.get<HinhThucKyLuat>(`${this.apiServerUrl}/htkl?id=${id}`);
  }
  public addHinhThucKyLuat(obj: HinhThucKyLuat): Observable<HinhThucKyLuat> {
    return this.http.post<HinhThucKyLuat>(`${this.apiServerUrl}/htkl/add`, obj);
  }

  public updateHinhThucKyLuat(objId: number, obj: HinhThucKyLuat): Observable<HinhThucKyLuat> {
    return this.http.put<HinhThucKyLuat>(`${this.apiServerUrl}/htkl/${objId}`, obj);
  }

  public deleteHinhThucKyLuat(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/htkl/${objId}`);
  }

  public searchHinhThucKyLuatByName(ten: String): Observable<HinhThucKyLuat[]> {
    return this.http.get<HinhThucKyLuat[]>(`${this.apiServerUrl}/htkl/list?ten=${ten}`);
  }
  //
  // public uploadFileQuyetDinhKL(id : number, fileData: any): Observable<HinhThucKyLuat> {
  //   return this.http.put<HinhThucKyLuat>(`${this.apiServerUrl}/htkl/uploadfile?id=${id}&file`, fileData);
  // }
  //
  // public getFileData(idFile: any) {
  //   return this.http.get(`${this.apiServerUrl}/htkl/open/${idFile}`, {observe: "response", responseType: "blob"});
  // }
}

