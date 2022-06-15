import { ServerResponse } from './../interfaces';
import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public selectedHeroes$ = new BehaviorSubject<String[]>([]);
  private previousValue: Array<String> = [];
  constructor(private http: HttpClient) {}

  public getByName(id: string): Observable<ServerResponse> {

    return this.http.get<ServerResponse>(
      `${environment.heroes.searchBy}/${id}`,
    );
  }

  public addToFavoriteHero(event: Event): void {
    const targetHero = event.target as HTMLInputElement;
    targetHero.disabled = true;
    this.previousValue = [...this.selectedHeroes$.value, targetHero.id];
    this.selectedHeroes$.next(this.previousValue);
  }
}
