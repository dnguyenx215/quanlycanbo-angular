import {Injectable} from "@angular/core";
import {HinhThucKhenThuong} from "../models/hinhthuckhenthuong";
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: "root"
})
export class HinhThucKhenThuongService {
  private apiServerUrl = "http://localhost:8009/api";


  constructor(private http: HttpClient) {}


  public listHinhThucKhenThuong(): Observable<HinhThucKhenThuong[]> {
    return this.http.get<HinhThucKhenThuong[]>(`${this.apiServerUrl}/htkt/list`);
  }
  public listHinhThucKhenThuongByDonVi(dv : string): Observable<HinhThucKhenThuong[]> {
    return this.http.get<HinhThucKhenThuong[]>(`${this.apiServerUrl}/htkt/list?donvi=${dv}`);
  }
  public getHinhThucKhenThuong(id : string): Observable<HinhThucKhenThuong> {
    return this.http.get<HinhThucKhenThuong>(`${this.apiServerUrl}/htkt?id=${id}`);
  }
  public addHinhThucKhenThuong(qd : HinhThucKhenThuong): Observable<HinhThucKhenThuong> {
    return this.http.post<HinhThucKhenThuong>(`${this.apiServerUrl}/htkt/add`, qd);
  }

  // public uploadFileHinhThucKhenThuong(id : number, fileData: any): Observable<HinhThucKhenThuong> {
  //   return this.http.put<HinhThucKhenThuong>(`${this.apiServerUrl}/htkt/uploadfile?id=${id}&file`, fileData);
  // }
  //
  // public getFileData(idFile: any) {
  //   return this.http.get(`${this.apiServerUrl}/htkt/open/${idFile}`, {observe: "response", responseType: "blob"});
  // }

  public updateHinhThucKhenThuong(objId: number, obj: HinhThucKhenThuong): Observable<HinhThucKhenThuong> {
    return this.http.put<HinhThucKhenThuong>(`${this.apiServerUrl}/htkt/${objId}`, obj);
  }

  public deleteHinhThucKhenThuong(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/htkt/${objId}`);
  }

  public searchHinhThucKhenThuongByName(ten: String): Observable<HinhThucKhenThuong[]> {
    return this.http.get<HinhThucKhenThuong[]>(`${this.apiServerUrl}/htkt/list?ten=${ten}`);
  }

}

