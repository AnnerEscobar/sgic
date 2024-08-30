import { CreateCaso } from './../interfaces/create-caso.interface';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';/*
import { CreateCaso } from '../interfaces/create-caso.interface'; */
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SgicDataService {

  private http = inject(HttpClient);
  private readonly baseUrl: string = environment.baseUrl;

  constructor(){
  }

  createCaso(body: CreateCaso){
    return this.http.post<CreateCaso>(`${this.baseUrl}/sgic-data/create`, body)
    .pipe(
      catchError(err => throwError(()=> err.error.message))
    )
  }
/*
    CreateCaso(body: FormData){
      return this.http.post<FormData>(`${this.baseUrl}/sgic-data/create`, body)
      .pipe(
        catchError(err => throwError(()=> err.error.message))
      )
    } */

}
