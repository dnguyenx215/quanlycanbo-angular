import {Injectable} from "@angular/core";
import {ChucVu} from "../models/chucvu";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ChucVuService {
  private apiServerUrl = "http://localhost:8009/api";

  constructor(private http: HttpClient) {}


  public listChucVu(): Observable<ChucVu[]> {
    return this.http.get<ChucVu[]>(`${this.apiServerUrl}/chucvu/list`);
  }

  public getChucVu(id: String): Observable<ChucVu> {
    return this.http.get<ChucVu>(`${this.apiServerUrl}/chucvu/${id}`);
  }

  public addChucVu(obj: ChucVu): Observable<ChucVu> {
    return this.http.post<ChucVu>(`${this.apiServerUrl}/chucvu/add`, obj);
  }

  public updateChucVu(objId: string | undefined, obj: ChucVu): Observable<ChucVu> {
    return this.http.put<ChucVu>(`${this.apiServerUrl}/chucvu/${objId}`, obj);
  }

  public deleteChucVu(objId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/chucvu/${objId}`);
  }

}

