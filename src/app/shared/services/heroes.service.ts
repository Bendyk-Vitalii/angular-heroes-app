import { ServerResponse } from './../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getByName(id: string): Observable<ServerResponse> {
    console.log(this.http.get<any>(`${environment.heroes.searchBy}/${id}`));
    return this.http.get<any>(`${environment.heroes.searchBy}/${id}`);
  }

  formValidator(): FormGroup {
    return new FormGroup({
      searchById: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(1),
        Validators.required,
      ]),
      searchByName: new FormControl('', [
        Validators.minLength(1),
        Validators.required,
        Validators.pattern(/[^!@#\$%\^&\(\),\.+=\/\{\}?><":;|\d]/),
      ]),
    });
  }

  selectHero(id: string): void {
    const userJson = localStorage.getItem('selected-heroes-array');
    let currentArray = [];
    if (userJson) {
      currentArray = JSON.parse(userJson);
    }
    currentArray.push(id);
    return localStorage.setItem(
      'selected-heroes-array',
      JSON.stringify(currentArray)
    );
  }
}
