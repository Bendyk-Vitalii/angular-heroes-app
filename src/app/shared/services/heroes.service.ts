import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getBy(id: string): Observable<any> {
    return this.http.get<any>(`${environment.heroes.searchBy}/${id}`);
  }

  selectHero(id: string): void {}
}
