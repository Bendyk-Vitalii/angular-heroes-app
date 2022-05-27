import { Hero, ServerResponse } from './../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Observable, OperatorFunction } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getByName(id: string): Observable<ServerResponse> {
    return this.http.get<any>(`${environment.heroes.searchBy}/${id}`);
  }
}
