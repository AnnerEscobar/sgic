import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  constructor() { }


  getCasesByUser(userId: string): Observable<any[]>{
    return this.http.get<any>(`${this.baseUrl}/sgic-data/user/${userId}`)
  }

  countCasesByTipe():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/sgic-data/count-by-type`)
  }



}
