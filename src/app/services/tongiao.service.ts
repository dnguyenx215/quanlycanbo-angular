import {Injectable} from "@angular/core";
import {TonGiao} from "../models/tongiao";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: "root"
})
export class TonGiaoService {
  private apiServerUrl = "http://localhost:8009/api";

  constructor(private http: HttpClient) {}


  public listTonGiao(): Observable<TonGiao[]> {
    return this.http.get<TonGiao[]>(`${this.apiServerUrl}/tongiao/list`);
  }

  public addTonGiao(obj: TonGiao): Observable<TonGiao> {
    return this.http.post<TonGiao>(`${this.apiServerUrl}/tongiao/add`, obj);
  }

  public updateTonGiao(objId: number, obj: TonGiao): Observable<TonGiao> {
    return this.http.put<TonGiao>(`${this.apiServerUrl}/tongiao/${objId}`, obj);
  }

  public deleteTonGiao(objId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tongiao/${objId}`);
  }

}

